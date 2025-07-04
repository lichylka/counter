"use client";
import React from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import ideaFormAction from "@/actions/IdeaFormAction";
import { toast } from "sonner";

function IdeasForm() {
  return (
    <section className="py-12">
      <div className="max-w-xl mx-auto px-2">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Маєте ідеї, запит чи побажання?
        </h2>
        <p className="text-base text-muted-foreground mb-6 text-center">
          Напишіть, які калькулятори вам потрібні або що можна покращити. Ми не
          збираємо пошту — просто читаємо й діємо.
        </p>

        <form
          name="feedback"
          className="space-y-4"
          action={async (formData) => {
            const res = await ideaFormAction(formData);
            if(res.data){
              toast.success("Ваше повідомлення надіслано");
            }else{
              toast.error("Помилка при надсиланні повідомлення");
            }
          }}
          // onSubmit={async (e) => {
          //   e.preventDefault();
          //   console.log("send");
          //   const res = await resend.emails.send({
          //     from: "ideas@resend.dev",
          //     to: "economiccounter@gmail.com",
          //     subject: "Ideas",
          //     html: `<p>${message}</p>`,
          //   });
          //   console.log(res);

          // }}
        >
          <Label htmlFor="message">Ваше повідомлення / побажання:</Label>
          <Textarea
            id="message"
            name="message"
            required
            className="min-h-[100px]"
          />
          <Button type="submit" variant={"outline"} className="w-full">
            Надіслати
          </Button>
        </form>
      </div>
    </section>
  );
}

export default IdeasForm;
