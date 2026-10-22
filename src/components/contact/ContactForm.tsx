"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { sendContactMessageAction } from "@/app/contact/actions";

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
    <div>
      <p className="text-sm font-semibold tracking-wide text-neutral-400">FORM FIELDS</p>

      {submitted ? (
        <p className="mt-6 rounded-xl border border-sky-400/30 bg-sky-400/10 px-5 py-4 font-medium text-sky-300">
          Thanks — your message has been received. Our team will be in touch shortly.
        </p>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              required
              className="rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-400 focus:outline-none"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-400 focus:outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Work email"
            required
            className="w-full rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-400 focus:outline-none"
          />

          <textarea
            name="message"
            placeholder="Tell us about your project"
            required
            rows={5}
            className="w-full resize-y rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder:text-neutral-500 focus:border-sky-400 focus:outline-none"
          />

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-full bg-sky-400 px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "SENDING…" : "LET'S TALK"}
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
