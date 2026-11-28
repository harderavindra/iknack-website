"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { sendContactMessageAction } from "@/app/contact/actions";

const FIELD =
  "w-full rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-sky-400 focus:outline-none";

// Visible placeholder + screen-reader label (placeholders alone aren't announced reliably).
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="sr-only">
      {children}
    </label>
  );
}

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
      <h2 className="text-2xl font-bold text-white">Start the conversation</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-neutral-300">
        Whether you&apos;re building a new brand, launching a campaign, producing content or exploring innovative
        possibilities, we&apos;re ready to collaborate and create something exceptional together.
      </p>

      {submitted ? (
        <p role="status" className="mt-6 rounded-xl border border-sky-400/30 bg-sky-400/10 px-5 py-4 font-medium text-sky-300">
          Thanks — your message has been received. Our team will be in touch shortly.
        </p>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-name">Full name</Label>
              <input id="contact-name" type="text" name="name" placeholder="Full name" autoComplete="name" required className={FIELD} />
            </div>
            <div>
              <Label htmlFor="contact-designation">Designation</Label>
              <input
                id="contact-designation"
                type="text"
                name="designation"
                placeholder="Designation"
                autoComplete="organization-title"
                className={FIELD}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact-email">Work email</Label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Work email"
              autoComplete="email"
              inputMode="email"
              required
              className={FIELD}
            />
          </div>

          <div>
            <Label htmlFor="contact-message">Tell us about your project</Label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell us about your project"
              required
              rows={5}
              className={`${FIELD} resize-y`}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-1.5 rounded-full sm:w-auto bg-sky-400 px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
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
