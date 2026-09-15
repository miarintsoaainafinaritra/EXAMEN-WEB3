"use client";

import { useTransition } from "react";
import { deletePoll } from "@/lib/actions";

export default function DeleteButton({ pollId }: { pollId: string }) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Supprimer ce sondage ? Cette action est irréversible.")) return;

    startTransition(async () => {
      try {
        const result = await deletePoll(pollId);
        if (result?.error) {
          alert(result.error);
        }
      } catch (err) {
        console.error("Erreur suppression :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl text-white bg-indigo-600 border border-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed shrink-0 shadow-sm"
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      {pending ? "Suppression…" : "Supprimer"}
    </button>
  );
}