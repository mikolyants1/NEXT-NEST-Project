import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./model/hooks/getCookie";

export async function middleware(req:NextRequest){
  const store:ReadonlyRequestCookies = cookies();
  if (!store.has("userId")) notFound();
  const userId = await getCookie("userId");
  const reg = new RegExp(/\/|main|invitation|profile/g);
  const id = req.nextUrl.pathname.replace(reg,"");
  if (id !== userId){
    const url = new URL(`/main/${id}`,req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher:[
    "/invitation/:id",
    "/main/:id/profile"
  ]
}