import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated") {
    const subscription = event.data.object as any;

    await prisma.user.updateMany({
      where: { stripeId: subscription.customer },
      data: {
        // extend schema later if needed
      }
    });
  }

  return NextResponse.json({ received: true });
}
