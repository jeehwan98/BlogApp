export default function BlogTitle({ title }: { title: string }) {
  return (
    <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold">
      {title}
    </h1>
  )
}