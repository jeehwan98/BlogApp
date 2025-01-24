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




  // // This will overwrite the default binding also named 'tab'
  // tab: {
  //   key: 9,
  //   handler: function () {
  //     // Handle tab
  //   }
  // },

  // There is no default binding named 'custom'
  // so this will be added without overwriting anything
  custom: {
    key: ['b', 'B'],
    shiftKey: true,
    handler: function (range: any, context: any) {
      // Handle shift+b
    }
  },

  list: {
    key: 'Backspace',
    format: ['list'],
    handler: function (range: any, context: any) {
      if (context.offset === 0) {
        // When backspace on the first character of a list,
        // remove the list instead
        this.quill.format('list', false, Quill.sources.USER);
      } else {
        // Otherwise propogate to Quill's default
        return true;
      }
    }
  }
};