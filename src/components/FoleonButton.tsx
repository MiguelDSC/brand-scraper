import { HTMLAttributes } from "react";
import classNames from "classnames";

type FoleonButtonVariant = "default" | "outlined";

type FoleonButtonProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant: FoleonButtonVariant;
};

function FoleonButton(props: FoleonButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "h-12 rounded",
        {
          "bg-blue-button text-white": props.variant == "default",
          "border border-foleon-color text-foleon-color":
            props.variant == "outlined",
        },
        props.className
      )}
    >
      {props.label}
    </button>
  );
}

export default FoleonButton;
