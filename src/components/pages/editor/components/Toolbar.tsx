export default function Toolbar({ onDownloadClick = () => { } }: any) {
  return (
    <div className="mt-4 space-y-2">
      {/* <button className="w-full bg-gray-200 p-2 rounded">Undo</button>
      <button className="w-full bg-gray-200 p-2 rounded">Redo</button> */}
      <button className="w-full bg-yellow-200 p-2 rounded" onClick={onDownloadClick}>Download</button>
      <button className="w-full bg-indigo-200 p-2 rounded">Share</button>
    </div>
  );
}