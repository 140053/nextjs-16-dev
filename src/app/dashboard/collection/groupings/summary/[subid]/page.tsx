import SummaryClient from "./forclient";

export default async function Page({ params }: { params: Promise<{ subid: number }> }) {
  const { subid } = await params; // OK in server component
  return <SummaryClient subid={Number(subid)} />;
}
