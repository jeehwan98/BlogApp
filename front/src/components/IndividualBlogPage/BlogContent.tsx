import DOMPurify from "dompurify"

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="ql-snow">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
        style={{
          marginTop: "30px",
          overflow: "auto",
          whiteSpace: "normal"
        }}
      />
    </div>
  )
}