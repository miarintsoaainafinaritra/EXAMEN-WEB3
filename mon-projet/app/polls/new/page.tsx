import NewPollForm from "@/components/NewPollForm";

export const metadata = { title: "Nouveau sondage · Quick Poll" };

export default function NewPollPage() {
  return (
    <main className="py-10 px-6">
      <NewPollForm />
    </main>
  );
}
