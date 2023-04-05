import LogoList from "./LogoList";
import FaviconItem, { API } from "./FaviconItem";
import FaviconList from "./FaviconList";
const notFound = "../src/assets/imageNotFound.png";

type LogoSectionProps = {
  scrapedUrls: string[];
};

const addBorderHandler = (event: React.MouseEvent<HTMLElement>) => {
  event.currentTarget.classList.toggle("border-solid");
  event.currentTarget.classList.toggle("border-4");
  event.currentTarget.classList.toggle("border-blue-button");
};

const onResetLogo = (error: any) => {
  error.target.src = notFound;
};

function LogoSection(props: LogoSectionProps) {
  return (
    <div className="flex flex-col py-8 border-b">
      <div className="justify-between items-center pb-4">
        <p className="text-2xl font-medium">Logo</p>
      </div>
      <div className="items-center">
        <div className="mr-2">
          <LogoList
            src={props.scrapedUrls.filter((url) => !url.includes(API))}
            resetLogo={onResetLogo}
            onClick={addBorderHandler}
          />
          <FaviconList
            srcList={props.scrapedUrls.filter((url) => url.includes(API))}
            resetLogo={onResetLogo}
            onClick={addBorderHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoSection;
