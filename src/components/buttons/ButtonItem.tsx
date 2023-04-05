import { HTMLAttributes } from "react";

type ButtonItemProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function ButtonItem(props: ButtonItemProps) {
  return (
    <div onClick={props.onClick}>
      <p className="font-medium pb-2">{props.title}</p>
      <div className="w-full bg-slate-100 h-24 flex justify-center items-center mb-6">
        <button style={props.style} className="py-3 px-6">
          {props.title}
        </button>
      </div>
    </div>
  );
}

export default ButtonItem;
