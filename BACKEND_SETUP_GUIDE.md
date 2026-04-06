# 🚀 Full Backend Setup Guide

This guide walks you through setting up the complete Stripe payment system for HonestNeed.

## Project Structure

```
APP-NEW-LANDING-PAGE/
├── src/                                # Frontend code
│   ├── components/
│   │   ├── common/
│   │   │   ├── StripePaymentForm.jsx  # ✨ NEW: Payment form
│   │   │   ├── TermsCheckbox.jsx      # ✅ Already created
│   │   │   └── SecureCheckoutBadge.jsx# ✅ Already created
│   │   └── sections/
│   │       └── Footer.jsx             # ✅ Updated with contact info
│   └── App.jsx                        # ✅ Updated with routing
├── backend/                           # ✨ NEW: Node/Express server
│   ├── server.js                      # Main server file
│   ├── package.json                   # Dependencies
│   ├── .env.example                   # Environment template
│   └── README.md                      # Backend docs
├── .env.example                       # Frontend env template
└── PAYMENT_INTEGRATION_GUIDE.md       # ✅ Reference docs
```

## Step 1: Setup Backend

### Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added 87 packages in 12s
```

### Create .env File

```bash
cp .env.example .env
```

Now edit `backend/.env` with your Stripe keys (get these in Step 2):

```env
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
PORT=3001
FRONTEND_URL=http://localhost:5174
NODE_ENV=development
```

## Step 2: Get Stripe API Keys (5 minutes)

### 2a. Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now"
3. Create account (free - no credit card required for test mode)
4. Verify email

### 2b. Get Test API Keys

1. Log in to https://dashboard.stripe.com
2. Go to **Developers** (left sidebar)
3. Click **API keys**
4. You should see two keys:
   - 📘 **Publishable key** (starts with `pk_test_`)
   - 🔒 **Secret key** (starts with `sk_test_`)

Copy both and paste into `backend/.env`:

```env
STRIPE_PUBLIC_KEY=pk_test_51234567890...
STRIPE_SECRET_KEY=sk_test_51234567890...
```

### 2c. Get Webhook Secret (Optional for now)

You can skip this for initial testing. Later:

1. Go to **Developers** → **Webhooks**
2. Click "Add endpoint"
3. URL: `http://localhost:3001/api/webhook`
4. Events: Select `checkout.session.completed`
5. Copy signing secret
6. Add to `.env` as `STRIPE_WEBHOOK_SECRET=whsec_...`

## Step 3: Setup Frontend

### Create Frontend .env File

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
VITE_BACKEND_URL=http://localhost:3001
```

Note: `VITE_` prefix is required for Vite to expose to frontend!

## Step 4: Run Everything

### Terminal 1: Frontend

```bash
cd APP-NEW-LANDING-PAGE
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5174/
```

### Terminal 2: Backend

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 HonestNeed Backend running on http://localhost:3001
```

## Step 5: Test Payment Flow

### 1. Add Payment Form to Landing Page

Open `src/App.jsx` and add the form (example):

```jsx
import StripePaymentForm from '@/components/common/StripePaymentForm';

// Add to your page:
<StripePaymentForm />
```

Or add to any section. For example in `SponsorshipTiers.jsx`:

```jsx
import StripePaymentForm from '@/components/common/StripePaymentForm';

export default function SponsorshipTiers() {
  return (
    <>
      {/* ... existing code ... */}
      <StripePaymentForm />
    </>
  );
}
```

### 2. Test Payment

1. Open http://localhost:5174
2. Scroll to payment form
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Tier: `Silver` ($100)
4. ✅ Check the "I agree to terms..." checkbox
5. Click "Pay $100"

### 3. Check Backend

You should see in the backend terminal:

```
✅ POST /api/create-checkout-session 200
```

And the form should show:

```
✅ Payment session created! Session ID: cs_test_1234567...
```

## Checking It Works

### Check 1: Backend Health

```bash
curl http://localhost:3001/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-04-06T10:30:00.000Z",
  "environment": "development"
}
```

### Check 2: Frontend Can Call Backend

In browser console (F12):
```javascript
fetch('http://localhost:3001/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should print `{status: "ok", ...}`

### Check 3: Payment Form Works

Fill the form and click submit. Check:
- ✅ Backend logs the request
- ✅ Frontend shows success message
- ✅ No CORS errors in browser console

## 🎉 You're Ready!

At this point:
- ✅ Backend is running and accepting payments
- ✅ Frontend can submit payment forms
- ✅ Stripe sessions are being created

## Next: Actual Payment Processing

When ready to take real payments:

1. **Get Live Stripe Keys**
   - Log into Stripe dashboard
   - Toggle "View test data" to OFF
   - Get live keys (start with `pk_live_`, `sk_live_`)
   - Update `.env` files

2. **Add to Frontend**
   ```jsx
   // Uncomment in StripePaymentForm.jsx
   const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
   await stripe.redirectToCheckout({ sessionId });
   ```

3. **Add Database**
   - Save payments after webhook confirmation
   - Send thank you emails
   - Track sponsorships

4. **Deploy**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/AWS
   - Use production Stripe keys

## 📝 Common Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build

# Backend
npm run dev          # Start with auto-reload
npm start            # Start normally
npm install          # Install dependencies
```

## 🚨 Troubleshooting

### "CORS error" or "Failed to fetch"
- Check backend is running (`npm run dev` in backend folder)
- Check `VITE_BACKEND_URL` matches backend address
- Backend CORS should allow `http://localhost:5174`

### "Payment session created" but form doesn't redirect
- This is normal in test mode
- To enable Stripe redirect, uncomment lines in StripePaymentForm.jsx
- First need to install `@stripe/stripe-js`: `npm install @stripe/stripe-js`

### Form submission fails silently
- Open browser console (F12)
- Check for errors
- Check backend terminal for errors

### Backend won't start
- Make sure port 3001 is free
- Try changing PORT in `.env`
- Check all env variables are set correctly

## 📚 Documentation

- **Frontend Guide**: See `PAYMENT_INTEGRATION_GUIDE.md`
- **Backend Guide**: See `backend/README.md`
- **Stripe Docs**: https://stripe.com/docs
- **Deployment Guide**: See `STRIPE_INTEGRATION.md`

## ✅ Checklist: Ready for Production?

- [ ] Backend running without errors
- [ ] Frontend connects to backend
- [ ] Payment form displays correctly
- [ ] Form submission works
- [ ] Backend logs payments
- [ ] Live Stripe keys obtained
- [ ] Deployed to production servers
- [ ] HTTPS enabled
- [ ] Webhooks configured
- [ ] Database setup for saving payments
- [ ] Email notifications working

## 📞 Get Help

- **Email**: jbowser727@gmail.com
- **Stripe Support**: https://support.stripe.com
- **Check Logs**: Look at terminal output for errors

---

**Ready to receive payments? 💰 You got this!**
