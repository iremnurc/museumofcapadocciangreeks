"use client";

import { useActionState } from "react";
import { sendMessage, type FormState } from "@/app/contact/actions";
import { eyeA, eyeB } from "@/lib/pixels";

// Inline fields sit in the sentence: serif, underlined, turning red when active.
const inline =
  "ml-2 inline-block border-0 border-b border-stone/60 bg-transparent px-0.5 py-0 font-serif text-[1em] leading-[1.15] italic text-madder placeholder:text-stone/70 focus:border-madder focus:outline-none rounded-none [field-sizing:content] min-w-[4ch]";

const topics = [
  { value: "Planning a visit", label: "a visit" },
  { value: "Group or school visit", label: "a group or school visit" },
  { value: "Academic enquiry", label: "an academic enquiry" },
  { value: "Something else", label: "something else" },
];

/** Contact form written as a short letter: the visitor fills in the blanks. */
export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-2">
        <svg viewBox="0 0 19 19" width="76" height="76" shapeRendering="crispEdges" aria-hidden>
          <path fill="#8E2A22" d={eyeA} />
          <path fill="#1A1612" d={eyeB} />
        </svg>
        <span className="font-serif text-[56px] leading-none">
          Thank <span className="italic text-madder">you</span>
        </span>
        <span className="font-serif text-[21px] leading-normal text-body">Your message has been sent. We&apos;ll reply as soon as we can.</span>
        <button type="button" onClick={() => location.reload()} className="ring-btn cursor-pointer rounded-full border border-ink bg-transparent px-[22px] py-3 text-sm hover:bg-ink hover:text-paper">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-8">
      <p className="m-0 font-serif text-[clamp(24px,2.4vw,34px)] leading-[1.9] text-ink">
        Hello, my name is
        <input name="name" type="text" required autoComplete="name" aria-label="Your name" placeholder="your name" size={14} className={inline} />{" "}
        and you can reach me at
        <span className="whitespace-nowrap">
          <input name="email" type="email" required autoComplete="email" aria-label="Your email" placeholder="your email" size={18} className={inline} />.
        </span>{" "}
        I&apos;m writing about
        <span className="relative inline-block whitespace-nowrap">
          <select name="topic" aria-label="What you are writing about" defaultValue={topics[0].value} className={`${inline} cursor-pointer appearance-none pr-6`}>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-1 bottom-[0.45em] text-[0.45em] text-madder">
            ▼
          </span>
          .
        </span>
      </p>
      <label className="flex flex-col gap-2">
        <span className="font-serif text-[clamp(24px,2.4vw,34px)] leading-tight text-ink">My message:</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Write here…"
          className="w-full resize-none border-0 bg-transparent font-serif text-[21px] leading-[2] italic text-body placeholder:text-stone/70 focus:outline-none"
          // ruled lines, like writing paper
          style={{
            backgroundImage: "linear-gradient(to bottom, transparent calc(2em - 1px), rgb(106 98 88 / 0.35) calc(2em - 1px))",
            backgroundSize: "100% 2em",
          }}
        />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state.status === "error" ? (
        <p role="alert" className="m-0 text-sm text-madder">
          {state.message}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={pending} className="pill cursor-pointer border-0 px-8 py-4 text-[15px] disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
