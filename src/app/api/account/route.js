import { swell } from "@/lib/swell/node";
import { NextResponse } from "next/server";
export async function GET(req) {
  const url = new URL(req.url);
  const accountId = url.searchParams.get("accountId");

  const res = await swell.get("/accounts/{id}", {
    id: accountId,
  });

  return NextResponse.json(res);
}
