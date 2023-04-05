import ColorsList from "./ColorsList";

type ColorSelectionProps = { colors: string[] };

function ColorsSection(props: ColorSelectionProps) {
  return (
    <div className="flex flex-col py-8 border-b">
      <div className="flex justify-between items-center pb-4">
        <p className="text-2xl font-medium">Colors</p>
      </div>
      <p className="font-medium">Swatches</p>
      <div className="flex items-center ">
        <ColorsList colors={props.colors} />
      </div>
    </div>
  );
}

export default ColorsSection;
