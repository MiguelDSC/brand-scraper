import React, { HTMLAttributes, ReactEventHandler } from "react";
export const API = "http://www.google.com/s2/favicons?sz=256&domain=";

type FaviconItemProps = {
  domain: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  resetLogo: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function FaviconItem(props: FaviconItemProps) {
  return (
    <div>
      <img
        key={Math.round(Math.random() * 100)}
        onClick={props.onClick}
        onError={props.resetLogo}
        src={props.domain}
        className="border rounded-md w-auto h-24"
        style={{
          marginTop: "0.5rem",
          marginRight: "0.5rem",
          minWidth: "6rem",
        }}
      />
    </div>
  );
}
