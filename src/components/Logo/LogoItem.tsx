import React, { HTMLAttributes, ReactEventHandler } from "react";

type LogoItemProps = {
  src: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  resetLogo: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function LogoItem(props: LogoItemProps) {
  return (
    <img
      key={Math.round(Math.random() * 100)}
      onError={props.resetLogo}
      onClick={props.onClick}
      src={props.src}
      className="border rounded-md h-auto w-48 bg-slate-100"
      style={{ marginTop: "0.5rem" }}
    />
  );
}
