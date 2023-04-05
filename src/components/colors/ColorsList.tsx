import React from "react";
import ColorItem from "./ColorItem";

type ColorListProps = {
  colors: string[];
};

function ColorsList(props: ColorListProps) {
  const addBorderHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.classList.toggle("border-solid");
    event.currentTarget.classList.toggle("border-4");
    event.currentTarget.classList.toggle("border-blue-button");
  };

  let content = props.colors.map((color) => {
    return (
      <div className="mb-1" key={color}>
        <ColorItem onClick={addBorderHandler} color={color} />
      </div>
    );
  });

  return <div className="flex flex-wrap">{content}</div>;
}

export default ColorsList;
