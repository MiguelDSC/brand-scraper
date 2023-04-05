import { useState } from "react";
import ButtonsSection from "./components/buttons/ButtonsSection";
import ColorsSection from "./components/colors/ColorsSection";
import FoleonButton from "./components/FoleonButton";
import FontStylesSection from "./components/fontStyles/FontStylesSection";
import LogoSection from "./components/Logo/LogoSection";
import InputModal from "./components/InputModal";
import { ButtonType } from "./components/buttons/ButtonsSection";
import InputUrl from "./components/InputUrl";
import LoadingState from "./components/LoadingState";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [primaryButton, setPrimaryButton] = useState<ButtonType[]>([]);
  const [fontStyles, setFontStyles] = useState<string[][][]>([]);
  const [primaryColor, setPrimaryColor] = useState([]);
  const [logos, setLogos] = useState([]);
  const [active, setActive] = useState(false);

  const modalHandler = () => {
    setActive(!active);
  };

  return (
    <div className="py-12 flex justify-center text-foleon-color p-10">
      <div className="w-2/3 flex flex-col items-center">
        <div className="w-2/3">
          <InputModal activeModal={modalHandler} close={active} />
          <h1 className="text-3xl pb-4">Brand Scraper</h1>
          <p className="text-slate-500">
            Quick and easy implementation of your company’s branding in your
            Foleon brand kit.
          </p>
          <p className="text-slate-500">
            Simply paste a website URL in the input field below. Enjoy the brand
            scraper’s magic.
          </p>

          <InputUrl
            onActiveModal={modalHandler}
            onIsLoading={(e) => setIsLoading(e)}
            loadingPercentage={(e) => setLoadedPercentage(e)}
            onUpdateLogo={(array) => setLogos(array)}
            onUpdateColor={(array) => setPrimaryColor(array)}
            onUpdateFont={(fonts) => setFontStyles(fonts)}
            onUpdateButton={(array) => setPrimaryButton(array)}
          />
          {!isLoading ? (
            <>
              <LogoSection scrapedUrls={logos} />
              <ColorsSection colors={primaryColor} />
              <FontStylesSection fontStyles={fontStyles} />
              <ButtonsSection primaryButtons={primaryButton} />
              <div className="py-8 flex flex-row-reverse">
                <FoleonButton
                  className="px-4"
                  variant="outlined"
                  label="Apply Selected"
                />
                <FoleonButton
                  className="px-6 mr-1"
                  variant="default"
                  label="Apply All"
                />
              </div>
            </>
          ) : (
            <LoadingState percentage={loadedPercentage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
