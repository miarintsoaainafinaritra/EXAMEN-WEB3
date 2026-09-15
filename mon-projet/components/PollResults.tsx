"use client";

export type TallyItem = {
  id: string;
  label: string;
  votes: number;
  percentage: number;
};

type Props = {
  tally: TallyItem[];
  totalVotes: number;
};

const palette = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
];

export default function PollResults({ tally, totalVotes }: Props) {
  return (
    <div className="space-y-5">
      {tally.map((t, i) => (
        <div key={t.id}>
          <div className="flex justify-between text-sm mb-2 gap-3">
            <span className="font-medium text-slate-900">
              {t.label}
            </span>
            <span className="text-slate-700 tabular-nums">
              <span className="font-semibold text-slate-900">
                {t.votes}
              </span>{" "}
              vote{t.votes > 1 ? "s" : ""} · {t.percentage}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${palette[i % palette.length]}`}
              style={{ width: `${t.percentage}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-700">
          Total des votes
        </span>
        <span className="font-semibold text-slate-900 tabular-nums">
          {totalVotes}
        </span>
      </div>
    </div>
  );
}
