"use client";

import * as Select from "@radix-ui/react-select";
import { useActionState, type ReactNode } from "react";
import { sendMessage, type FormState } from "@/app/contact/actions";

// Inline fields sit in the sentence: serif, underlined, turning red when active.
const inline =
  "ml-2 inline-block border-0 border-b border-stone/60 bg-transparent px-0.5 py-0 font-serif text-[1em] leading-[1.15] italic text-madder placeholder:text-stone/70 focus:border-madder focus:outline-none rounded-none [field-sizing:content] min-w-[4ch]";

const topics = [
  { value: "Planning a visit", label: "a visit" },
  { value: "Group or school visit", label: "a group or school visit" },
  { value: "Academic enquiry", label: "an academic enquiry" },
  { value: "Something else", label: "something else" },
];

/**
 * Contact section body: the intro on the left, the form written as a short letter on the right.
 * Once sent, both are replaced by one thank-you note in the intro's place.
 */
export function ContactForm({ intro }: { intro: ReactNode }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, { status: "idle" });
  const row = "gutter flex flex-wrap items-start gap-x-20 gap-y-14 py-[clamp(96px,11vw,160px)]";

  if (state.status === "sent") {
    const about = topics.find((t) => t.value === state.topic)?.label;
    // a different key remounts the column: the heading-reveal split replaced React's text nodes
    return (
      <div key="sent" className={row}>
        <div role="status" className="sent-note flex min-w-0 flex-[1_1_360px] flex-col gap-5">
          <span className="label">Message sent</span>
          <h2 className="h2 m-0">
            Thank <span className="italic text-madder">you</span>
          </h2>
          <p className="m-0 max-w-[420px] font-serif text-[21px] leading-normal text-body">
            Your note{about ? ` about ${about}` : ""} is with us. We&apos;ll write back
            {state.email ? (
              <>
                {" "}to <span className="italic text-ink">{state.email}</span>
              </>
            ) : null}{" "}
            as soon as we can.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div key="form" className={row}>
      <div data-queued-reveal-children className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
        {intro}
      </div>
      <div data-queued-reveal-item className="min-w-0 flex-[1.3_1_480px]">
      <form action={action} className="flex flex-col gap-8">
        <p className="m-0 font-serif text-[clamp(24px,2.4vw,34px)] leading-[1.9] text-ink">
          Hello, my name is
          <input name="name" type="text" required autoComplete="name" aria-label="Your name" placeholder="your name" size={14} className={inline} />{" "}
          and you can reach me at
          <span className="whitespace-nowrap">
            <input name="email" type="email" required autoComplete="email" aria-label="Your email" placeholder="your email" size={18} className={inline} />.
          </span>{" "}
          I&apos;m writing about
          <span className="whitespace-nowrap">
            <TopicSelect />.
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
      </div>
    </div>
  );
}

/**
 * The topic blank: a small custom menu (Radix Select) so it matches the page in every
 * browser. Safari's native list would copy the sentence's 34px size in the system font.
 * Radix renders a hidden native <select name="topic"> so the form still submits it.
 */
function TopicSelect() {
  return (
    <Select.Root name="topic" defaultValue={topics[0].value}>
      <Select.Trigger
        aria-label="What you are writing about"
        className={`${inline} inline-flex cursor-pointer items-baseline gap-2 text-left data-[state=open]:border-madder`}
      >
        <Select.Value />
        <Select.Icon className="text-[0.45em] text-madder">▼</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden border border-rule bg-paper py-2 shadow-[0_12px_32px_rgb(26_22_18/0.14)]"
        >
          <Select.Viewport>
            {topics.map((t) => (
              <Select.Item
                key={t.value}
                value={t.value}
                className="relative cursor-pointer px-5 py-2 font-serif text-[20px] italic text-ink outline-none select-none data-[highlighted]:bg-parchment data-[highlighted]:text-madder data-[state=checked]:text-madder"
              >
                <Select.ItemText>{t.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
