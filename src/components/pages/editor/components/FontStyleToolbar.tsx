'use client';

type Props = {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  onChange: (updates: Partial<StyleUpdate>) => void;
};

type StyleUpdate = {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
};

export default function FontStyleToolbar({
  fontSize,
  fontWeight,
  fontFamily,
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
    </div>
  );
}
