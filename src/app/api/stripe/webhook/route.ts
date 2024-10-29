import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { subscriptionCreated } from "@/lib/stripe/stripe-actions";

const stripeWebhookEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  let stripeEvent: Stripe.Event;
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("🔴 Error: Missing Stripe webhook signature or secret.");
    return NextResponse.json(
      { error: "Webhook validation failed" },
      { status: 400 }
    );
  }

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🟢 Received Stripe Event: ${stripeEvent.type}`);
  } catch (error: any) {
    console.error(`🔴 Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  if (!stripeWebhookEvents.has(stripeEvent.type)) {
    console.warn("🔶 Unhandled event type:", stripeEvent.type);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const subscription = stripeEvent.data.object as Stripe.Subscription;
    console.log("🟢 Processing Subscription Event:", subscription.id);

    if (
      !subscription.metadata.connectAccountPayments &&
      !subscription.metadata.connectAccountSubscriptions
    ) {
      switch (stripeEvent.type) {
        case "customer.subscription.created": {
          if (subscription.status === "active") {
            console.log(
              "🔵 Subscription is active. Initiating `subscriptionCreated`."
            );

            await subscriptionCreated(
              subscription,
              subscription.customer as string
            );
            console.log(
              "✅ Subscription processed successfully:",
              subscription.id
            );
          } else {
            console.warn(
              "⚠️ Subscription skipped: not active",
              subscription.id
            );
          }
          break;
        }
        case "customer.subscription.updated": {
          if (subscription.status === "active") {
            console.log(
              "🔵 Subscription is active. Initiating `subscriptionCreated`."
            );

            await subscriptionCreated(
              subscription,
              subscription.customer as string
            );
            console.log(
              "✅ Subscription processed successfully:",
              subscription.id
            );
          } else {
            console.warn(
              "⚠️ Subscription skipped: not active",
              subscription.id
            );
          }
          break;
        }
        default:
          console.log("👉🏻 No handler for event type:", stripeEvent.type);
          break;
      }
    } else {
      console.log(
        "⚠️ Subscription ignored: connected account.",
        subscription.id
      );
    }
  } catch (error) {
    console.error("🔴 Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, received: true }, { status: 200 });
}
