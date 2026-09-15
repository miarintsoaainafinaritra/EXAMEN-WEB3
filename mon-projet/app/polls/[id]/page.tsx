import Link from "next/link";
import { notFound } from "next/navigation";
import { getPoll } from "@/lib/polls";
import { getVotedPolls } from "@/lib/actions";
import VoteForm from "@/components/VoteForm";
import PollResults, { type TallyItem } from "@/components/PollResults";

type Props = { params: Promise<{ id: string }> };

export default async function PollPage({ params }: Props) {
  const { id } = await params;
  const poll = await getPoll(id);
  if (!poll) notFound();
  const voted = await getVotedPolls();
  const hasVoted = voted.includes(poll.id);
  const total = poll.choices.reduce((s, c) => s + c.votes, 0);
  const tally: TallyItem[] = poll.choices.map((c) => ({
    id: c.id,
    label: c.label,
    votes: c.votes,
    percentage: total === 0 ? 0 : Math.round((c.votes / total) * 100),
  }));
  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/" className="text-sm text-blue-700 mb-6 inline-block font-medium">
        ← Retour à la liste
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-slate-900">{poll.question}</h1>
      {hasVoted ? (
        <div className="space-y-5">
          <p className="text-sm font-medium text-green-800 bg-green-50 border border-green-200 rounded p-3">
            ✓ Vous avez déjà voté
          </p>
          <PollResults tally={tally} totalVotes={total} />
          <Link
            href="/"
            className="inline-block px-4 py-2 border rounded"
          >
            Retour à la liste
          </Link>
        </div>
      ) : (
        <VoteForm pollId={poll.id} choices={poll.choices} />
      )}
    </main>
  );
}
