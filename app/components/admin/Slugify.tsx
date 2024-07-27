import React from "react";
import { Kbd, Clipboard } from "flowbite-react";

export const Slugify = ({ value }) => {
  const newVal = value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>{newVal}</Kbd> <Clipboard valueToCopy={newVal} label="Copy" className="px-2 py-1 text-xs font-medium text-center"/>
    </div>
  );
};
