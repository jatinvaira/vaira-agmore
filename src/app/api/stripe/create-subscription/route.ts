import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customerId, priceId } = await req.json();
  if (!customerId || !priceId)
    return new NextResponse("Customer Id or price id is missing", {
      status: 400,
    });

  const subscriptionExists = await db.agency.findFirst({
    where: { customerId },
    include: { Subscription: true },
  });

  try {
    let subscription, clientSecret;

    if (
      subscriptionExists?.Subscription?.subscriptionId &&
      subscriptionExists.Subscription.active
    ) {
      // Update the existing subscription
      console.log("Updating the subscription");
      const currentSubscriptionDetails = await stripe.subscriptions.retrieve(
        subscriptionExists.Subscription.subscriptionId
      );

      subscription = await stripe.subscriptions.update(
        subscriptionExists.Subscription.subscriptionId,
        {
          items: [
            {
              id: currentSubscriptionDetails.items.data[0].id,
              deleted: true,
            },
            { price: priceId },
          ],
          expand: ["latest_invoice.payment_intent"],
        }
      );
      //@ts-ignore
      clientSecret = subscription.latest_invoice?.payment_intent?.client_secret;
    } else {
      // Create a new subscription
      console.log("Creating a new subscription");
      subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });
      //@ts-ignore
      clientSecret = subscription.latest_invoice?.payment_intent?.client_secret;

      // Save the new subscription to the database
      await db.agency.update({
        where: { customerId },
        data: {
          Subscription: {
            create: {
              subscriptionId: subscription.id,
              active: true,
              priceId: priceId, // Assuming this is available in your current context
              customerId: customerId, // Also available in your context
              currentPeriodEndDate: new Date(subscription.current_period_end * 1000), // Ensure this date is valid
            },
          },
        },
      });
      
    }

    // If updating, update the database entry with new subscription details
    if (subscriptionExists && subscriptionExists.Subscription) {
      await db.subscription.update({
        where: { id: subscriptionExists.Subscription.id },
        data: {
          subscriptionId: subscription.id,
          active: subscription.status === "active",
        },
      });
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret,
    });
  } catch (error) {
    console.error("🔴 Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
