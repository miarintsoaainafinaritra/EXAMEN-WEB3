"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";
import {
  type Poll,
  getPoll,
  incrementVote,
  insertPoll,
  removePoll,
} from "./polls";

export type ActionResult = { success?: true; error?: string };

export async function createPoll(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const question = (formData.get("question") as string).trim();
    if (question.length < 5 || question.length > 120) {
      return { error: "La question doit contenir entre 5 et 120 caractères." };
    }
    const labels = formData
      .getAll("choice")
      .map((c) => (c as string).trim())
      .filter((c) => c.length > 0);
    if (labels.length < 2 || labels.length > 5) {
      return { error: "Un sondage doit avoir entre 2 et 5 choix." };
    }
    const lower = labels.map((l) => l.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      return { error: "Les choix ne doivent pas être identiques." };
    }
    const poll: Poll = {
      id: crypto.randomUUID(),
      question,
      createdAt: new Date().toISOString(),
      choices: labels.map((label) => ({
        id: crypto.randomUUID(),
        label,
        votes: 0,
      })),
    };
    await insertPoll(poll);
    redirect("/");
  } catch (e) {
    if ((e as { message?: string }).message?.includes("NEXT_REDIRECT")) throw e;
    return { error: "Erreur lors de la création du sondage." };
  }
}

export async function vote(
  pollId: string,
  choiceId: string
): Promise<ActionResult> {
  try {
    const poll = await getPoll(pollId);
    if (!poll) return { error: "Sondage introuvable." };
    if (!poll.choices.some((c) => c.id === choiceId)) {
      return { error: "Choix invalide." };
    }
    const ck = await cookies();
    const votedRaw = ck.get("voted")?.value;
    const voted: string[] = votedRaw ? JSON.parse(votedRaw) : [];
    if (voted.includes(pollId)) {
      return { error: "Vous avez déjà voté pour ce sondage." };
    }
    const updated = await incrementVote(pollId, choiceId);
    if (!updated) return { error: "Erreur lors du vote." };
    voted.push(pollId);
    ck.set("voted", JSON.stringify(voted), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return { success: true };
  } catch (e) {
    return { error: "Erreur lors du vote." };
  }
}

export async function deletePoll(pollId: string): Promise<ActionResult> {
  try {
    await removePoll(pollId);
    redirect("/");
  } catch (e) {
    if ((e as { message?: string }).message?.includes("NEXT_REDIRECT")) throw e;
    return { error: "Erreur lors de la suppression." };
  }
}

export async function getVotedPolls(): Promise<string[]> {
  const ck = await cookies();
  const raw = ck.get("voted")?.value;
  return raw ? JSON.parse(raw) : [];
}
