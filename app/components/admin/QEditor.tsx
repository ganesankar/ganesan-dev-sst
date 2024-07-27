import React from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
interface EditorProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, placeholder, onChange }: EditorProps) => {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "header",
    "link",
    "color",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  React.useEffect(() => {
    if (quill) {
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, value, onChange]);

  return (
    <div style={{ height: 200 }}>
      <div ref={quillRef} />
    </div>
  );
};
