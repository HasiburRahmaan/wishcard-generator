'use client';

type Props = {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  onChange: (updates: Partial<StyleUpdate>) => void;
};

type StyleUpdate = {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
};

export default function FontStyleToolbar({
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
  backgroundColor,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div>
        <label className="block mb-1">Font Size</label>
        <input
          type="number"
          value={parseInt(fontSize)}
          onChange={(e) => onChange({ fontSize: `${e.target.value}px` })}
          className="w-full p-1 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => onChange({ fontWeight: e.target.value })}
          className="w-full p-1 border border-gray-300 rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => onChange({ fontFamily: e.target.value })}
          className="w-full p-1 border border-gray-300 rounded"
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => onChange({ textColor: e.target.value })}
          className="w-full h-8 p-0 border-none bg-transparent"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => onChange({ backgroundColor: e.target.value })}
          className="w-full h-8 p-0 border-none bg-transparent"
        />
        <button className={`w-full bg-gray-200 p-2 rounded active:scale-95`} onClick={() => onChange({ backgroundColor: 'transparent' })}>Make Transparent</button>
      </div>
    </div>
  );
}
