import Stripe from 'stripe';
require("dotenv").config({ path: "../.env.local" });
console.log("checking env",process.env.STRIPE_SECRET_KEY)
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
});

export default stripe;
