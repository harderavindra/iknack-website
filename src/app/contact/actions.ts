"use server";

import { z } from "zod";
import { sendMail } from "@/lib/mail";

const contactSchema = z.object({
  name: z.string().trim().min(1),
  designation: z.string().trim().optional(),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

export async function sendContactMessageAction(
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    designation: formData.get("designation"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Please fill in all required fields with valid values." };
  }

  const { name, designation, email, message } = parsed.data;

  try {
    await sendMail({
      subject: `New contact form message from ${name}`,
      replyTo: email,
      text: [`Name: ${name}`, designation ? `Designation: ${designation}` : null, `Email: ${email}`, "", message]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });
    return { ok: true };
  } catch (err) {
    console.error("Failed to send contact email", err);
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  }
}
