"use client";

export function SetUserIdInCookies({ userId }: { userId: string }) {
  if (!globalThis.document) return null;
  if (!document.cookie.includes("userId")) {
    document.cookie = `userId=${userId}; path=/`;
  }
  return null;
}
