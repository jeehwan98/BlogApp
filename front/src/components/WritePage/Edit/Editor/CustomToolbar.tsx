export default function CustomToolbar() {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header">
          <option value="1">Header 1</option>
          <option value="2">Header 2</option>
          <option value="3">Header 3</option>
        </select>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-bold" />
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline" />
        <button type="button" className="ql-strike" />
        <button type="button" className="ql-blockquote" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-image" />
        <button type="button" className="ql-video" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-clean" />
        <button type="button" className="ql-code-block" />
      </span>
    </div>
  )
}