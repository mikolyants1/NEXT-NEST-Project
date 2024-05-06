import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
  const cookieStore = cookies();
  if (!cookieStore.has("userId")){
    notFound();
  }
  const userId = cookieStore.get("userId")?.value;
  const reg = new RegExp(/[main]|[/{0,2}]|[invitation]|[profile]/gi);
  const id = req.nextUrl.pathname.replace(reg,"");
  if (id == userId){
    const url = new URL(`/main/${id}`,req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher:["/invitation/:id","/main/:id/profile"]
}