import FaviconItem, { API } from "./FaviconItem";
import LogoItem from "./LogoItem";
let content = <p> No results found. </p>;

type LogoListProps = {
  src: string[];
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  resetLogo: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function LogoList(props: LogoListProps) {
  return (
    <div className="">
      {props.src !== undefined && props.src.length > 0
        ? props.src.map((url, index) => {
            return (
              <LogoItem
                src={url}
                onClick={props.onClick}
                resetLogo={props.resetLogo}
                key={index}
              />
            );
          })
        : content}
    </div>
  );
}
