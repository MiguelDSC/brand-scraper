import React from "react";

type ColorItemProps = {
  color: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function ColorItem(props: ColorItemProps) {
  return (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: props.color }}
      className={"border rounded-md w-10 h-10 mr-1"}
    />
  );
}

export default ColorItem;
