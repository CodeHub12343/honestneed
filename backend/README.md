# HonestNeed Backend - Stripe Payment Server

A simple Node.js/Express server that handles Stripe payments for the HonestNeed landing page.

## 📋 What This Does

- ✅ Creates secure Stripe checkout sessions
- ✅ Handles payment webhooks (confirm when user pays)
- ✅ Retrieves payment status
- ✅ Logs all transactions
- ✅ CORS enabled for frontend communication

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment File

Copy the example and add your Stripe keys:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual Stripe keys:

```env
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
PORT=3001
FRONTEND_URL=http://localhost:5174
```

### 3. Get Stripe Keys (5 minutes)

1. Go to https://dashboard.stripe.com/login
2. Create a free Stripe account
3. Go to Developers → API Keys
4. Copy the **Test** Publishable Key (pk_test_...)
5. Copy the **Test** Secret Key (sk_test_...)
6. Paste both into your `.env` file

**For webhook secret:**
- Go to Developers → Webhooks
- Add endpoint: `http://localhost:3001/api/webhook`
- Select events: `checkout.session.completed`
- Copy the signing secret

### 4. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

**Output:**
```
🚀 HonestNeed Backend running on http://localhost:3001
📝 Environment: development
🔌 Frontend origin: http://localhost:5174

✅ Endpoints:
   GET  /api/health
   POST /api/create-checkout-session
   GET  /api/checkout-session/:sessionId
   POST /api/webhook
```

## 🔌 API Endpoints

### 1. Health Check
```
GET /api/health
```

Returns server status:
```json
{
  "status": "ok",
  "timestamp": "2026-04-06T10:30:00.000Z",
  "environment": "development"
}
```

### 2. Create Checkout Session
```
POST /api/create-checkout-session
Content-Type: application/json

{
  "tier": "silver",
  "email": "user@example.com",
  "name": "John Doe"
}
```

Response:
```json
{
  "sessionId": "cs_test_xxxxxxxxxxxxx"
}
```

**Tiers & Amounts:**
- `bronze`: $50
- `silver`: $100
- `gold`: $250
- `platinum`: $500

### 3. Get Session Status
```
GET /api/checkout-session/cs_test_xxxxxxxxxxxxx
```

Returns payment status:
```json
{
  "id": "cs_test_xxxxxxxxxxxxx",
  "status": "paid",
  "customer_email": "user@example.com",
  "amount_total": 10000,
  "metadata": {
    "name": "John Doe",
    "tier": "silver"
  }
}
```

### 4. Webhook (Automatic)
```
POST /api/webhook
```

Stripe automatically sends payment confirmations here.
Logs successful payments for your records.

## 🧪 Test Payment

### Using the Frontend Form

1. Start both servers:
   ```bash
   # Terminal 1: Frontend
   cd .. && npm run dev

   # Terminal 2: Backend
   cd backend && npm run dev
   ```

2. Go to http://localhost:5174
3. Fill the payment form
4. Use test card: `4242 4242 4242 4242`
5. Any future date for expiry (e.g., 12/26)
6. Any CVC (e.g., 424)
7. Click "Pay"

### Expected Flow
```
✅ Form submission to your backend
✅ Backend creates Stripe session
✅ Redirects to Stripe checkout
✅ Pay with test card
✅ Redirects to success page
✅ Check terminal logs for "Checkout completed"
```

## 🔐 Production Checklist

Before deploying to production:

- [ ] Replace test keys with LIVE keys from Stripe
- [ ] Update `FRONTEND_URL` to your live domain
- [ ] Enable HTTPS (required by Stripe)
- [ ] Add database to save payments
- [ ] Add email notifications on payment
- [ ] Test webhook signatures are verified
- [ ] Monitor Stripe dashboard for issues
- [ ] Set up error alerting

### Get Live Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Toggle "View test data" to OFF
3. Copy LIVE Publishable Key (pk_live_...)
4. Copy LIVE Secret Key (sk_live_...)
5. Update `.env` with live keys

⚠️ **NEVER hardcode API keys in code!**

## 📝 Next Steps: Save Payments

The webhook currently just logs payments. To save to a database:

```javascript
// In server.js, update handleCheckoutCompleted()

async function handleCheckoutCompleted(session) {
  // Save to your database:
  const payment = await db.payments.create({
    stripeSessionId: session.id,
    email: session.customer_email,
    tier: session.metadata.tier,
    amount: session.amount_total / 100,
    name: session.metadata.name,
    status: 'completed',
    createdAt: new Date(),
  });

  // Send thank you email
  await sendEmail(session.customer_email, {
    subject: 'Thank you for sponsoring HonestNeed!',
    template: 'sponsor-thank-you',
  });

  console.log('✅ Payment saved:', payment);
}
```

## 🚨 Troubleshooting

### "Port 3001 already in use"
```bash
# Use different port
PORT=3002 npm run dev

# Or kill the process using port 3001
# Windows: netstat -ano | findstr 3001
# Mac/Linux: lsof -i :3001
```

### "Connection refused" error
- Make sure backend is running (`npm run dev`)
- Check that FRONTEND_URL matches your frontend address
- Verify CORS is enabled

### "Webhook signature verification failed"
- Regenerate webhook signing secret
- Update `STRIPE_WEBHOOK_SECRET` in `.env`

### "Invalid API Key"
- Double-check STRIPE_SECRET_KEY is copied correctly
- Make sure it starts with `sk_test_` or `sk_live_`
- Verify it's not in quotes in `.env`

## 📚 Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Webhook Events](https://stripe.com/docs/api/events/types)
- [Test Card Numbers](https://stripe.com/docs/testing)

## 📞 Support

- Email: jbowser727@gmail.com
- Stripe Support: https://support.stripe.com
- My Notes: See PAYMENT_INTEGRATION_GUIDE.md

---

**Happy receiving payments! 💰**
