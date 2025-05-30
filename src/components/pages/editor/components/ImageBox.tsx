'use client';

import { Rnd } from 'react-rnd';

type ImageBoxProps = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  onDragStop: (id: string, x: number, y: number) => void;
  onResizeStop: (id: string, width: number, height: number) => void;
  onSelect: (id: string) => void;
};

export default function ImageBox({
  id,
  src,
  x,
  y,
  width,
  height,
  isSelected,
  onDragStop,
  onResizeStop,
  onSelect,
}: ImageBoxProps) {
  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(_, data) => onDragStop(id, data.x, data.y)}
      onResizeStop={(_, __, ref, ___, position) =>
        onResizeStop(id, parseInt(ref.style.width), parseInt(ref.style.height))
      }
      onClick={() => onSelect(id)}
      bounds="parent"
      className={`absolute ${isSelected ? 'border-2 border-blue-500' : ''}`}
    >
      <img
        src={src}
        alt="Uploaded"
        className="w-full h-full object-contain pointer-events-none"
      />
    </Rnd>
  );
}
