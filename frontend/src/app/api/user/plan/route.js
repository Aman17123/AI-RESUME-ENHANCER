import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../../lib/supabaseServer";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ plan: "guest", email: null }, { status: 200 });
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPremium = data?.plan === "premium" && data?.status === "active";

  return NextResponse.json({
    plan: isPremium ? "premium" : "free",
    email: user.email,
    user_id: user.id,
  });
}