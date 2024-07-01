import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  const { accountId } = body;
  const res = await swell.get("/orders", {
    where: {
      account_id: accountId,
    },
  });

  return NextResponse.json({ data: res });
}

export async function GET(req) {
  const url = new URL(req.url);
  const accountId = url.searchParams.get("accountId");

  const res = await swell.get("/orders", {
    where: {
      account_id: accountId,
    },
  });
  return NextResponse.json({ data: res });
}
