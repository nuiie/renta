"use client"

import { useGlobalState } from "@/context/GlobalStateContext"

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const { properties, loading } = useGlobalState()
  const property = properties.find((p) => p.id === parseInt(params.id))

  if (loading) {
    return <div>loading...</div>
  }

  if (!property) {
    return <div>property not found</div>
  }

  return (
    <section className="px-6">
      property details {property.nickname}
      <p>header, nickname, button for edit, menu</p>
      <p>Carousel</p>
      <p>property table form</p>
      <p>contract list</p>
    </section>
  )
}
