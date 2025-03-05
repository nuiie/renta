export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  return (
    <section className="px-6">
      property details {id}
      <p>header, nickname, button for edit, menu</p>
      <p>Carousel</p>
      <p>property table form</p>
      <p>contract list</p>
    </section>
  )
}
