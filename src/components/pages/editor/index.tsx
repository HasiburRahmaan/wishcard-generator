'use client';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { toPng } from 'html-to-image';

import TemplatePicker from './components/TemplatePicker';
import Toolbar from './components/Toolbar';
import FontStyleToolbar from './components/FontStyleToolbar';
import Canvas from './components/Canvas';

type Box = {
  id: string;
  text: string;
  type: 'text' | 'image';
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
};
const templates = [
  '/templates/template1.jpg',
  '/templates/template2.jpg',
  '/templates/template3.webp',
]

export default function WishCardEditor() {
  const initialBoxes: Box[] = [
    {
      id: uuidv4(),
      type: 'text',
      text: 'Your Message',
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      fontSize: '16px',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
    },
  ];
  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(600);
  const [boxes, setBoxes] = useState<Box[]>(initialBoxes);
  const [history, setHistory] = useState<Box[][]>([]);
  const [future, setFuture] = useState<Box[][]>([]);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(templates[0]);

  const selectedBox = boxes.find((b) => b.id === selectedBoxId) || null;

  const commitChange = (newBoxes: Box[]) => {
    setHistory((prev) => [...prev, boxes]);
    setBoxes(newBoxes);
    setFuture([]); // Clear redo stack
  };
  const updateBox = (id: string, updates: Partial<Box>) => {
    const updated = boxes.map((box) =>
      box.id === id ? { ...box, ...updates } : box
    );
    commitChange(updated);
  };
  const addBox = () => {
    const newBox: Box = {
      id: uuidv4(),
      type: 'text',
      text: 'New Text',
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      fontSize: '16px',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
    };
    commitChange([...boxes, newBox]);
    setSelectedBoxId(newBox.id);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      //@ts-ignore
      const newBox: Box = {
        id: uuidv4(),
        type: 'image',
        src,
        x: 100,
        y: 100,
        width: 150,
        height: 150,
      };
      commitChange([...boxes, newBox]);
      setSelectedBoxId(newBox.id);
    };
    reader.readAsDataURL(file);
  };

  const deleteBox = () => {
    if (!selectedBoxId) return;
    const filtered = boxes.filter((b) => b.id !== selectedBoxId);
    commitChange(filtered);
    setSelectedBoxId(null);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = [...history];
    const lastState = prev.pop()!;
    setFuture((f) => [...f, boxes]);
    setBoxes(lastState);
    setHistory(prev);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = [...future];
    const nextState = next.pop()!;
    setHistory((h) => [...h, boxes]);
    setBoxes(nextState);
    setFuture(next);
  };
  const handleTemplateSelect = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      // setCanvasWidth(img.naturalWidth);
      // setCanvasHeight(img.naturalHeight);
      setSelectedTemplate(src);
    };
  };



  const handleDownload = async () => {
    const node = document.getElementById('wish-card-canvas');
    if (!node) return;

    /* this is for high resolution download */
    const scale = 1;
    try {
      await document.fonts.ready;

      // const style = {
      //   transform: `scale(${scale})`,
      //   transformOrigin: 'top left',
      //   width: `${canvasWidth}px`,
      //   height: `${canvasHeight}px`,
      // };

      const dataUrl = await toPng(node, {
        // width: canvasWidth * scale,
        // height: canvasHeight * scale,
        // style,
        width: 800,
        height: 600,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = 'wish-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };


  return (
    <div className="flex w-full">
      <aside className="w-72 bg-white p-4 shadow-md border-r space-y-4">
        <TemplatePicker
          templates={templates}
          onTemplateSelect={handleTemplateSelect}
        />
        <Toolbar onDownloadClick={handleDownload} />
        <div className="space-y-2">
          <button onClick={addBox} className="bg-green-500 text-white w-full py-2 rounded">
            + Add Text Box
          </button>
          <label className="bg-purple-500 text-white w-full py-2 rounded block text-center cursor-pointer">
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <button onClick={deleteBox} disabled={!selectedBoxId} className={`w-full py-2 rounded ${selectedBoxId ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
            Delete Selected
          </button>
          {/* <div className="flex gap-2">
            <button onClick={undo} disabled={history.length === 0}
              className={`flex-1 py-2 rounded ${history.length ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              Undo
            </button>
            <button onClick={redo} disabled={future.length === 0}
              className={`flex-1 py-2 rounded ${future.length ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              Redo
            </button>
          </div> */}
        </div>
        {selectedBox && (
          <FontStyleToolbar
            fontSize={selectedBox.fontSize}
            fontWeight={selectedBox.fontWeight}
            fontFamily={selectedBox.fontFamily}
            onChange={(updates) => updateBox(selectedBox.id, updates)}
          />
        )}
      </aside>

      <section className="flex-1 p-6 overflow-auto">
        <Canvas
          boxes={boxes}
          selectedId={selectedBoxId}
          setSelectedId={setSelectedBoxId}
          onUpdateBox={updateBox}
          template={selectedTemplate}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      </section>
    </div>
  );
}
