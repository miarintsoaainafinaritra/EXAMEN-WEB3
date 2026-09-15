import Link from "next/link";
import { listPolls } from "@/lib/polls";
import DeleteButton from "@/components/DeleteButton";

export default async function Home() {
  const polls = await listPolls();
  return (
    <main className="flex-1 w-full">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-indigo-700 mb-2 tracking-wide uppercase">
              Quick Poll
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Sondages express
            </h1>
            <p className="mt-3 text-slate-700 max-w-xl">
              Tranchez rapidement vos décisions d'équipe. Créez un sondage,
              partagez le lien, et voyez les résultats en temps réel.
            </p>
          </div>
          <Link
            href="/polls/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl shadow-sm whitespace-nowrap"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouveau sondage
          </Link>
        </header>

        {polls.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl py-20 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Aucun sondage pour le moment
            </h2>
            <p className="mt-1 text-slate-600">
              Créez-en un pour commencer à prendre des décisions.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {polls.map((p) => {
              const total = p.choices.reduce((s, c) => s + c.votes, 0);
              return (
                <li
                  key={p.id}
                  className="group relative bg-white border border-slate-200 rounded-3xl p-6 shadow-lg shadow-slate-200/80 text-slate-900"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/polls/${p.id}`}
                        className="block"
                      >
                        <h2 className="text-lg font-semibold text-slate-900">
                          {p.question}
                        </h2>
                      </Link>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
                        <span className="inline-flex items-center gap-1.5 text-slate-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 10h16M4 14h10M4 18h6"
                            />
                          </svg>
                          {p.choices.length} choix
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-slate-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <span className="font-medium text-slate-900">
                            {total}
                          </span>{" "}
                          vote{total > 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-slate-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(p.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <DeleteButton pollId={p.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
