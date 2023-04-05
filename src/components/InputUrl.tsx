import { AiOutlineDownload } from "react-icons/ai";
import { FormEvent, useState } from "react";
import {
  getButtonStyle,
  getColorStyle,
  getFontStyle,
  getLogos,
  getStatus,
} from "./WebsiteService";

type InputUrlProps = {
  onIsLoading: (data: boolean) => void;
  loadingPercentage: (percentage: number) => void;
  onUpdateLogo: (images: []) => void;
  onUpdateButton: (styles: []) => void;
  onUpdateColor: (styles: []) => void;
  onUpdateFont: (styles: []) => void;
  onActiveModal: () => void;
};

function InputUrl(props: InputUrlProps) {
  const [insertedUrl1, setInsertedUrl1] = useState<string>("");
  const [insertedUrl2, setInsertedUrl2] = useState<string>("");
  const [insertedUrl3, setInsertedUrl3] = useState<string>("");

  const [inputFields, setInputFields] = useState(1);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawUrlArray = [insertedUrl1, insertedUrl2, insertedUrl3];
    const urlArray = rawUrlArray.filter((item) => item != "");

    let validCount = 0;

    for (let i = 0; i < urlArray.length; i++) {
      if (urlArray[i] !== undefined) {
        console.log(await getStatus(urlArray[i]));

        if (await getStatus(urlArray[i])) validCount = validCount + 1;
      }
    }

    if (validCount == urlArray.length) {
      props.onIsLoading(true);
      props.loadingPercentage(0);
      props.onUpdateLogo(await getLogos(urlArray));
      props.loadingPercentage(25);
      props.onUpdateColor(await getColorStyle(urlArray));
      props.loadingPercentage(50);
      props.onUpdateFont(await getFontStyle(urlArray));
      props.loadingPercentage(75);
      props.onUpdateButton(await getButtonStyle(urlArray));
      props.loadingPercentage(100);

      setTimeout(() => {
        props.onIsLoading(false);
      }, 1000);
    } else {
      props.onActiveModal();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="border-b py-8">
        <p>Website URL</p>
        <div className="flex-col justify-center my-2">
          <input
            className="border rounded-l-md w-full h-12 px-2"
            placeholder="https://www."
            onChange={(e) => setInsertedUrl1(e.target.value)}
          />
          {inputFields > 1 && (
            <input
              className="border rounded-l-md w-full h-12 px-2 mt-2"
              placeholder="https://www."
              onChange={(e) => setInsertedUrl2(e.target.value)}
            />
          )}
          {inputFields > 2 && (
            <input
              className="border rounded-l-md w-full h-12 px-2 mt-2"
              placeholder="https://www."
              onChange={(e) => setInsertedUrl3(e.target.value)}
            />
          )}
        </div>
        <div className="flex">
          <button className="py-3 px-4 mb-4 flex rounded text-white bg-blue-button">
            <AiOutlineDownload className="w-6 h-6 mr-2" />
            Fill Brand Kit
          </button>
          <button
            type="button"
            onClick={() => {
              setInputFields((prevState) => {
                if (prevState >= 3) return 3;
                return prevState + 1;
              });
            }}
            className=" ml-2 py-3 px-4 mb-4 flex rounded text-white bg-blue-button"
          >
            + Add Url
          </button>
          <button
            type="button"
            onClick={() => {
              setInputFields((prevState) => {
                if (prevState <= 1) return 1;
                return prevState - 1;
              });
            }}
            className=" ml-2 py-3 px-4 mb-4 flex rounded text-white bg-blue-button"
          >
            - Remove Url
          </button>
        </div>
        <p className="text-slate-500">
          Based on the entered URL, the brand styling of the website is
          retrieved from the codebase, translated and then merged into your
          brand kit usable in the Foleon editor.
        </p>
      </div>
    </form>
  );
}

export default InputUrl;
