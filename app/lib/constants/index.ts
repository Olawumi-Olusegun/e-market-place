
const APP_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://e-market-place-phi.vercel.app";
const STRIPE_CONNECT_WEBHOOK_SECRET = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;

const appConstants = {
    APP_BASE_URL,
    STRIPE_CONNECT_WEBHOOK_SECRET
}

export default appConstants