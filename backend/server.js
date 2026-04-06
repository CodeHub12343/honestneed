import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Routes

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

/**
 * Create Stripe Checkout Session
 * POST /api/create-checkout-session
 */
app.post('/api/create-checkout-session', async (req, res) => {
  console.log('🔔 Received POST /api/create-checkout-session');
  console.log('📦 Body:', req.body);
  console.log('📋 Headers:', req.headers);
  
  try {
    const { tier, email, name } = req.body;

    // Validate input
    if (!tier || !email || !name) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields: tier, email, name' 
      });
    }

    // Define tier prices (in cents)
    const tiers = {
      bronze: 5000,    // $50
      silver: 10000,   // $100
      gold: 25000,     // $250
      platinum: 50000, // $500
    };

    const amount = tiers[tier];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `HonestNeed ${tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsorship`,
              description: `Support HonestNeed at the ${tier} tier`,
              images: [],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        name,
        tier,
        email,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
      locale: 'en',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to create checkout session' 
    });
  }
});

/**
 * Retrieve Checkout Session
 * GET /api/checkout-session/:sessionId
 */
app.get('/api/checkout-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      id: session.id,
      status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Retrieve session error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Webhook for Stripe Events
 * POST /api/webhook
 */
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.error('Payment failed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

/**
 * Handle successful checkout
 */
async function handleCheckoutCompleted(session) {
  console.log('✅ Checkout completed:', {
    sessionId: session.id,
    email: session.customer_email,
    amount: session.amount_total / 100, // Convert to dollars
    metadata: session.metadata,
    timestamp: new Date().toISOString(),
  });

  // TODO: Here you would:
  // 1. Save to database (sponsorship record)
  // 2. Send thank you email to customer
  // 3. Send notification to admin
  // 4. Update user's sponsor status

  // Example:
  // await saveSponsorshipToDB({
  //   email: session.customer_email,
  //   tier: session.metadata.tier,
  //   amount: session.amount_total,
  //   stripeSessionId: session.id,
  // });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: err.message || 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 HonestNeed Backend running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔌 Frontend origin: ${process.env.FRONTEND_URL}`);
  console.log(`\n✅ Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/create-checkout-session`);
  console.log(`   GET  /api/checkout-session/:sessionId`);
  console.log(`   POST /api/webhook`);
  console.log('\n');
});
