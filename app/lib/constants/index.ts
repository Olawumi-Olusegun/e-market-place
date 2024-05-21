
const APP_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://e-market-place-phi.vercel.app";
const STRIPE_CONNECT_WEBHOOK_SECRET = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
const STRIPE_SECRET_WEBHOOK = process.env.STRIPE_SECRET_WEBHOOK;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const appConstants = {
    APP_BASE_URL,
    STRIPE_CONNECT_WEBHOOK_SECRET,
    STRIPE_SECRET_WEBHOOK,
    RESEND_API_KEY
}

export default appConstants