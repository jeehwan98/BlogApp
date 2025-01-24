import { Quill } from "react-quill-new";

export const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "code-block",
];

export const bindings = {

  // Custom binding for headers using #
  headerShortcut: {
    key: " ",
    collapsed: true, // ensure no text is selected
    prefix: /^(#{1,3})$/,
    handler: function (this: any, range: any, context: any) {
      const quill = this.quill;

      // get the no of # symbols
      const level = context.prefix.length;

      // apply the corresponding heading level (1, 2, or 3)
      quill.formatLine(range.index, level, "header", level);

      // remove the # character
      quill.deleteText(range.index - level, level);
    },
  },

  codeShortcut: {
    key: "Enter",
    collapse: true,
    prefix: /^\/code$/,
    handler: function (this: any, range: any, context: any) {
      const quill = this.quill;

      // apply "code-block" format
      quill.formatLine(range.index, 1, "code-block", true);

      // remove the "/code" text
      quill.deleteText(range.index - 5, 5); // "/code" is removed
    },
  },
};