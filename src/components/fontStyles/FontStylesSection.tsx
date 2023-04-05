import FontStylesList from "./FontStylesList";

const links = [
  "Scraped from first URL:",
  "Scraped from second URL:",
  "Scraped from third URL:",
];

type FontStylesSectionProps = {
  fontStyles: string[][][];
};

function FontStylesSection({ fontStyles }: FontStylesSectionProps) {
  let content = null;

  if (fontStyles.length > 0) {
    content = (
      <div>
        {fontStyles.map((styles, i) => (
          <div key={i} className="mb-4">
            <h1 className="flex justify-center items-center bg-slate-100 w-64 h-10 mb-4 rounded">
              {links[i]}
            </h1>
            <FontStylesList fontStyle={styles} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="pt-8 pb-6 border-b">
      <div className="flex justify-between items-center pb-4">
        <p className="text-2xl font-medium">Font Styles</p>
      </div>
      {content ?? <p>No font styles found</p>}
    </div>
  );
}

export default FontStylesSection;
