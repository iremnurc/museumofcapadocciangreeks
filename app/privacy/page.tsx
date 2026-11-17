import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <section className="gutter mx-auto max-w-[760px] py-24">
      <h1 className="h2 m-0">Privacy</h1>
      <div className="body-serif mt-8 flex flex-col gap-5">
        <p className="m-0">This site does not use tracking cookies. If you send a message through the contact form, we use your name and email only to reply to you.</p>
        <p className="m-0">To ask about your data, write to cappadocianstudies@gmail.com.</p>
      </div>
    </section>
  );
}
