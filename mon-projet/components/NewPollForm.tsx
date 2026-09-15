"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { createPoll, type ActionResult } from "@/lib/actions";

const initial: ActionResult = {};

export default function NewPollForm() {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<string[]>(["", ""]);
  const [state, formAction, pending] = useActionState(createPoll, initial);

  const add = () => choices.length < 5 && setChoices([...choices, ""]);
  const remove = (i: number) =>
    choices.length > 2 && setChoices(choices.filter((_, idx) => idx !== i));
  const setVal = (i: number, v: string) =>
    setChoices(choices.map((c, idx) => (idx === i ? v : c)));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-semibold text-indigo-700 mb-1 tracking-wide uppercase">
            Nouveau
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Créer un sondage
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour
        </Link>
      </div>

      <form
        action={formAction}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-indigo-100/60 space-y-7"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Question
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              minLength={5}
              maxLength={120}
              placeholder="Ex : Quel framework préférez-vous pour le prochain projet ?"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-indigo-300 bg-white text-slate-900 placeholder:text-slate-500 outline-none"
            />
            <p className="mt-1.5 text-xs text-slate-600">
              {question.length}/120 caractères
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-900">
              Choix de réponse
            </label>
            <span className="text-xs font-medium text-slate-700 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
              {choices.length}/5
            </span>
          </div>
          <div className="space-y-3">
            {choices.map((c, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <input
                  type="text"
                  name="choice"
                  value={c}
                  onChange={(e) => setVal(i, e.target.value)}
                  required
                  placeholder={`Choix ${i + 1}`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={choices.length <= 2}
                  aria-label="Supprimer ce choix"
                  title={choices.length <= 2 ? "Minimum 2 choix" : "Supprimer"}
                  className="shrink-0 w-10 h-10 inline-flex items-center justify-center rounded-xl text-slate-600 border border-transparent disabled:opacity-30 disabled:cursor-not-allowed"
                >
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
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={add}
            disabled={choices.length >= 5}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-xl border border-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Ajouter un choix
          </button>
        </div>

        {state.error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <svg
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
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
            <p className="text-sm text-red-700 leading-relaxed">
              {state.error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {pending ? "Création en cours…" : "Créer le sondage"}
        </button>
      </form>
    </div>
  );
}
