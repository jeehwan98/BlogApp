export default function EditContent() {
  return (
    <div className="flex items-center justify-between gap-8">
      <textarea
        className="w-full px-3 py-2 rounded-sm outline-none bg-transparent"
        placeholder="Write your story..."
      />
    </div>
  )
}