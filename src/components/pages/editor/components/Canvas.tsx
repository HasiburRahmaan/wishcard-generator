'use client';

import ImageBox from './ImageBox';
import TextBox from './TextBox';

type Box = {
  id: string;
  type: 'text' | 'image';
  text: string;
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
};
type Props = {
  boxes: Box[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  onUpdateBox: (id: string, updates: Partial<Box>) => void;
  template: string | null;
  canvasWidth: number;
  canvasHeight: number;
};

export default function Canvas({ boxes, selectedId, template, canvasWidth, canvasHeight, setSelectedId, onUpdateBox }: Props) {


  return (
    <div
      className="relative w-[800px] h-[600px] border bg-white"
      id="wish-card-canvas"
      style={{
        // width: canvasWidth,
        // height: canvasHeight,
        backgroundImage: template ? `url(${template})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {boxes.map((box) =>
        box.type === 'text' ? (
          <TextBox
            key={box.id}
            {...box}
            isSelected={selectedId === box.id}
            onChange={(id, value) => onUpdateBox(id, { text: value })}
            onDragStop={(id, x, y) => onUpdateBox(id, { x, y })}
            onResizeStop={(id, w, h) => onUpdateBox(id, { width: w, height: h })}
            onSelect={setSelectedId}
          />
        ) : (
          <ImageBox
            key={box.id}
            id={box.id}
            src={box.src!}
            x={box.x}
            y={box.y}
            width={box.width}
            height={box.height}
            isSelected={selectedId === box.id}
            onDragStop={(id, x, y) => onUpdateBox(id, { x, y })}
            onResizeStop={(id, w, h) => onUpdateBox(id, { width: w, height: h })}
            onSelect={setSelectedId}
          />
        )
      )}

    </div>
  );
}
