import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "polls.json");

export type Choice = { id: string; label: string; votes: number };
export type Poll = {
  id: string;
  question: string;
  createdAt: string;
  choices: Choice[];
};
export type Store = { polls: Poll[] };

export async function loadStore(): Promise<Store> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Store;
}

async function writeStore(store: Store): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2));
}

export async function listPolls(): Promise<Poll[]> {
  const store = await loadStore();
  return [...store.polls].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPoll(id: string): Promise<Poll | null> {
  const store = await loadStore();
  return store.polls.find((p) => p.id === id) ?? null;
}

export async function insertPoll(poll: Poll): Promise<Poll> {
  const store = await loadStore();
  store.polls.push(poll);
  await writeStore(store);
  return poll;
}

export async function removePoll(id: string): Promise<void> {
  const store = await loadStore();
  store.polls = store.polls.filter((p) => p.id !== id);
  await writeStore(store);
}

export async function incrementVote(
  pollId: string,
  choiceId: string
): Promise<Poll | null> {
  const store = await loadStore();
  const poll = store.polls.find((p) => p.id === pollId);
  if (!poll) return null;
  const choice = poll.choices.find((c) => c.id === choiceId);
  if (!choice) return null;
  choice.votes += 1;
  await writeStore(store);
  return poll;
}
