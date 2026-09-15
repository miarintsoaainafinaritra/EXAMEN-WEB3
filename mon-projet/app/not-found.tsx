import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto py-20 px-6 text-center">
      <h1 className="text-5xl font-bold mb-4 text-zinc-800">404</h1>
      <p className="text-zinc-600 mb-6">
        Ce sondage n&apos;existe pas ou a été supprimé.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
