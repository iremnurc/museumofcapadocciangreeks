"use client";

import { useActionState } from "react";
import { sendMessage, type FormState } from "@/app/contact/actions";
import { eyeA, eyeB } from "@/lib/pixels";

const field = "border-0 border-b border-ink bg-transparent py-3 text-lg rounded-none focus:outline-none focus:border-madder";
const label = "flex flex-col gap-1 text-[13px] text-stone";

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
    <form action={action} className="flex flex-col gap-7">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
        <label className={label}>
          Your name
          <input name="name" type="text" required autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className={label}>
        About
        <select name="topic" className={field} defaultValue="Planning a visit">
          <option>Planning a visit</option>
          <option>Group or school visit</option>
          <option>Academic enquiry</option>
          <option>Something else</option>
        </select>
      </label>
      <label className={label}>
        Message
        <textarea name="message" rows={4} required className={`${field} resize-y`} />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state.status === "error" ? (
        <p role="alert" className="m-0 text-sm text-madder">
          {state.message}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="pill cursor-pointer self-start border-0 px-[30px] py-[15px] disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
