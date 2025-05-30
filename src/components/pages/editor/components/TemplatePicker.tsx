import { StaticImageData } from "next/image";

type Props = {
  templates: any[];
  onTemplateSelect: (template: any) => void;
}
export default function TemplatePicker({ templates, onTemplateSelect }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Templates</h2>
      <div className="flex gap-2">
        {templates.map((template) => (
          <button
            key={template.src}
            className="w"
            onClick={() => onTemplateSelect(template)}
          >
            <img src={template.src ? template.src : template} className="w-[100px] h-[100px] object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}