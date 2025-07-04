"use server";

import resend from "@/lib/resend";

export default async function ideaFormAction(formData: FormData) {
  const message = formData.get("message");
  const res = await resend.emails.send({
    from: "ideas@resend.dev",
    to: "economiccounter@gmail.com",
    subject: "Ideas",
    html: `<p>${message}</p>`,
  });
  return res;
}
