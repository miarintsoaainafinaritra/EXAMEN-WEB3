"use client";

import { useState, useTransition } from "react";
import type { Choice } from "@/lib/polls";
import { vote } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  pollId: string;
  choices: Choice[];
};

export default function VoteForm({ pollId, choices }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setErr("Veuillez sélectionner un choix.");
      return;
    }
    setErr(null);
    startTransition(async () => {
      const res = await vote(pollId, selected);
      if (res.error) setErr(res.error);
      else router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-3">
        {choices.map((c) => {
          const isSelected = selected === c.id;

          return (
            <label
              key={c.id}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer ${isSelected ? "border-indigo-600 bg-indigo-50" : "border-slate-300 bg-slate-100"
                }`}
            >
              <span
                className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 ${isSelected ? "border-indigo-700" : "border-slate-500"
                  }`}
                aria-hidden="true"
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-indigo-700" />}
              </span>

              <input
                type="radio"
                name="choice"
                value={c.id}
                checked={isSelected}
                onChange={() => setSelected((current) => (current === c.id ? null : c.id))}
                className="sr-only"
              />

              <span className="font-medium text-slate-900">{c.label}</span>
            </label>
          );
        })}
      </div>

      {err && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl">
          <svg
            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300">{err}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-sm disabled:opacity-60 disabled:cursor-not-allowed border border-indigo-700"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
        {pending ? "Envoi du vote…" : "Voter"}
      </button>
    </form>
  );
}
