"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { sendContactMessageAction } from "@/app/contact/actions";

const ASSURANCES = [
  "Your information is secure and handled with strict confidentiality",
  "Quick response from our team",
  "Strategic and tailored solutions for every project",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await sendContactMessageAction(new FormData(e.currentTarget));

    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 text-neutral-900 md:p-12">
      <h2 className="text-3xl font-semibold md:text-4xl">Start the conversation</h2>
      <p className="mt-3 text-neutral-600">
        Fill in the details below and our team will get back to you promptly.
      </p>

      {submitted ? (
        <p className="mt-8 rounded-xl bg-sky-50 px-5 py-4 font-medium text-sky-700">
          Thanks — your message has been received. Our team will be in touch shortly.
        </p>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="rounded-xl border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-sky-400 focus:outline-none"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="rounded-xl border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-sky-400 focus:outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-sky-400 focus:outline-none"
          />

          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className="w-full resize-y rounded-xl border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-sky-400 focus:outline-none"
          />

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-sky-400 px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "SENDING…" : "SUBMIT"}
            </button>
          </div>
        </form>
      )}

      <ul className="mt-8 space-y-2">
        {ASSURANCES.map((text) => (
          <li key={text} className="flex items-start gap-2 text-sm text-neutral-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
