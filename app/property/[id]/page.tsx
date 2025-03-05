export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  return <section className="px-6">property details {id}</section>
}
