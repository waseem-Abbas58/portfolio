import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-medium text-cyan">404</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-3 font-semibold text-on-accent">Back home</Link>
      </div>
    </main>
  );
}
