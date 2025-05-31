'use client';

import { Rnd } from 'react-rnd';
import { useState } from 'react';

type TextBoxProps = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textColor: string;
  backgroundColor: string;
  onChange: (id: string, newText: string) => void;
  onDragStop: (id: string, x: number, y: number) => void;
  onResizeStop: (id: string, width: number, height: number) => void;
  onSelect: (id: string) => void;
};

export default function TextBox({
  id,
  text,
  x,
  y,
  width,
  height,
  isSelected,
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
  backgroundColor,
  onChange,
  onDragStop,
  onResizeStop,
  onSelect,
}: TextBoxProps) {
  const [localText, setLocalText] = useState(text);

  return (
    <Rnd
      default={{ x, y, width, height }}
      bounds="parent"
      onDragStop={(_, d) => onDragStop(id, d.x, d.y)}
      onResizeStop={(_, __, ref, ___, position) => {
        onResizeStop(id, parseInt(ref.style.width), parseInt(ref.style.height));
        onDragStop(id, position.x, position.y);
      }}
      onClick={() => onSelect(id)}
      style={{
        border: isSelected ? '2px solid blue' : '1px dashed gray',
        borderRadius: '4px',
        background: backgroundColor,
        padding: '0px',
      }}
    >
      <textarea
        value={localText}
        onChange={(e) => {
          setLocalText(e.target.value);
          onChange(id, e.target.value);
        }}
        className="w-full h-full resize-none p-1 text-black outline-none cursor-move"
        style={{
          fontSize,
          fontWeight,
          fontFamily,
          color: textColor,
          backgroundColor,
        }}
      />
    </Rnd>
  );
}
