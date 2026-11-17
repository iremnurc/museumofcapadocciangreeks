import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gutter py-32">
      <span className="label">Not found</span>
      <h1 className="h2 mt-4">This page is not in the collection.</h1>
      <Link href="/" className="pill mt-8">Back to home</Link>
    </section>
  );
}
