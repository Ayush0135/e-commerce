import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
    });

    try {
        const { amount } = await request.json();

        const options = {
            amount: amount * 100, // amount in paisa
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json(
            { error: "Could not create order" },
            { status: 500 }
        );
    }
}
