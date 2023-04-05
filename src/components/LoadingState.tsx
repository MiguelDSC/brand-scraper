import React, { useEffect, useState } from "react";

type LoadingStateProps = {
  percentage: number;
};

function LoadingState(props: LoadingStateProps) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${props.percentage}%`,
      };

      setStyle(newStyle);
    }, 200);
  }, [props.percentage]);

  return (
    <>
      <h1 style={{ marginTop: "15px" }}>Fetching Styles...</h1>
      <div
        style={{
          width: "100%",
          backgroundColor: "#d8d8d8",
          borderRadius: "20px",
          marginTop: "15px",
          height: "30px",
        }}
        className="bg-red-500 rounded-2xl h-20 w-72"
      >
        <div
          style={{
            backgroundColor: "#00B1FF",
            borderRadius: "20px",
            color: "white",
            display: "flex",
            justifyContent: "center",
            width: 0,
            height: "100%",
            opacity: 0,
            transition: "1s ease 0.1s",
            ...style,
          }}
        >
          {props.percentage}%
        </div>
      </div>
    </>
  );
}

export default LoadingState;
