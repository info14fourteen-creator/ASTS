import { TendersInbox, type OutcomeKey } from "./tenders-inbox";

type TendersSearchParams = Promise<{
  outcome?: string | string[];
}>;

const outcomeKeys = new Set<OutcomeKey>(["all", "suggested", "locked", "approved"]);

function parseOutcome(value: string | string[] | undefined): OutcomeKey {
  const outcome = Array.isArray(value) ? value[0] : value;

  if (outcome && outcomeKeys.has(outcome as OutcomeKey)) {
    return outcome as OutcomeKey;
  }

  return "all";
}

export default async function TendersPage({ searchParams }: { searchParams?: TendersSearchParams }) {
  const resolvedSearchParams = await searchParams;

  return <TendersInbox initialOutcome={parseOutcome(resolvedSearchParams?.outcome)} />;
}
