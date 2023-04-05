import ButtonItem from "./ButtonItem";

export type ButtonType = {
  backgroundColor: string;
  color: string;
  border: string;
};

type ButtonsSectionProps = {
  primaryButtons: ButtonType[];
};

function ButtonsSection(props: ButtonsSectionProps) {
  let content = <p>No buttons found</p>;

  const addBorderHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.classList.toggle("border-solid");
    event.currentTarget.classList.toggle("border-4");
    event.currentTarget.classList.toggle("border-blue-button");
  };

  if (props.primaryButtons.length != 0) {
    content = (
      <>
        {props.primaryButtons.map((buttonStyle, index) => {
          return (
            <div className="mt-5" key={index + 1}>
              <ButtonItem
                onClick={addBorderHandler}
                style={buttonStyle}
                title={`Button ${index + 1}`}
              />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="flex flex-col border-b py-8">
      <div className="flex justify-between items-center pb-4">
        <p className="text-2xl font-medium">Buttons</p>
      </div>
      {content}
    </div>
  );
}

export default ButtonsSection;
