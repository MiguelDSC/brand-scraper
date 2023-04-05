import { useCallback } from "react";
import FontStyleItem from "./FontStyleItem";

const fontStyleTitles = [
  "Header 1",
  "Header 2",
  "Header 3",
  "Header 4",
  "Somebody once said that the pen is mightier than the sword. Just imagine, with the power of digital publications and the ability to distribute your content around the world in mere seconds.",
];
const fontStyleAttributes = ["H1", "H2", "H3", "H4", "Paragraph"];

type FontStylesListProps = {
  fontStyle: string[][];
};

function FontStylesList({ fontStyle }: FontStylesListProps) {
  let content = null;

  const addBorderHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.currentTarget.classList.toggle("border-solid");
      event.currentTarget.classList.toggle("border-4");
      event.currentTarget.classList.toggle("border-blue-button");
    },
    []
  );

  if (fontStyle.length > 0) {
    content = [];

    for (let i = 0; i < fontStyle.length; i++) {
      const style = fontStyle[i];
      const title = fontStyleTitles[i];

      if (style.length === 0) {
        content.push(
          <div key={`${title}+${i}`} className="mt-5">
            <FontStyleItem
              style={{
                fontFamily: "Arial",
                fontSize: "18px",
                color: "rgb(0, 0, 0)",
              }}
              title={title}
              attribute={fontStyleAttributes[i]}
              font="Arial"
              size="18px"
              rgb="rgb(0,0,0)"
              onClick={addBorderHandler}
            />
          </div>
        );
      } else {
        content.push(
          <FontStyleItem
            key={`${title}+${i}+jaman`}
            style={{
              fontFamily: style[0],
              fontSize: style[1],
              color: style[2],
            }}
            title={title}
            attribute={fontStyleAttributes[i]}
            font={style[0]}
            size={style[1]}
            rgb={style[2]}
            onClick={addBorderHandler}
          />
        );
      }
    }
  }

  return <div>{content}</div>;
}

export default FontStylesList;
