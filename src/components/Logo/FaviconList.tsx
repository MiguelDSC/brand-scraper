import FaviconItem, { API } from "./FaviconItem";
import LogoItem from "./LogoItem";
const notFound = "../src/assets/imageNotFound.png";
let content = <p className="mt-3"> No favicons found. </p>;

type FaviconListProps = {
  srcList: string[];
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  resetLogo: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

export default function FaviconList(props: FaviconListProps) {
  return (
    <>
      <div className="flex justify-between items-center mt-3">
        <p className="text-base font-medium">Favicon</p>
      </div>
      <div className="flex flex-wrap">
        {props.srcList !== undefined && props.srcList.length > 0
          ? props.srcList.map((url, index) => {
              return (
                <FaviconItem
                  domain={url}
                  onClick={props.onClick}
                  resetLogo={props.resetLogo}
                  key={index}
                />
              );
            })
          : content}
      </div>
    </>
  );
}
