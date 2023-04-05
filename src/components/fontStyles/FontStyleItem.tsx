import { HTMLAttributes } from "react";

type FontStyleItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  attribute: string;
  font: string;
  size: string;
  rgb: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function FontStyleItem({
  title,
  attribute,
  font,
  size,
  rgb,
  ...rest
}: FontStyleItemProps) {
  return (
    <div {...rest} className="pb-4">
      <p className="flex items-center px-4 py-2 bg-slate-100">{title}</p>
      <p className="text-sm text-slate-500">
        {attribute} | {font} | {size} | {rgb}
      </p>
    </div>
  );
}

export default FontStyleItem;
