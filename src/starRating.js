import { useCallback, useState } from "react";
import PropTypes from "prop-types";
const startContainer = {
  margin: 0,
  padding: 0,
  cursor: "Pointer",
  height: "50px",
  width: "auto",
  display: "flex",
  color: "white",
  justifyContent: "start",
};
const pstyle = {
  color: "white",
  height: "30px",
  width: "30px",
  userSelect: "none",
};
StarRating.prototype = {
  maxrating: PropTypes.number,
};
export default function StarRating({
  maxrating = 5,
  color = "#fcc419",
  backgroundColor = "white",
  size = 48,
  messages = [],
  setRating,
}) {
  const textStyle = {
    fontSize: "20px",
    display: "flex",
    backgroundColor: "",
    justifyContent: "center",
  };
  const [Rating, setrating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  function handelRating(rating) {
    setrating(rating);
    setRating(rating);
  }
  function handelmouseEnter(rating) {
    setTempRating(rating);
  }
  function handelmouseOut(rating) {
    setTempRating(rating);
  }
  return (
    <div style={startContainer}>
      <div style={textStyle}>
        {Array.from({ length: maxrating }, (_, i) => (
          <EmStar
            Rating={Rating}
            key={i}
            onRate={() => {
              handelRating(i + 1);
            }}
            full={tempRating ? tempRating >= i + 1 : Rating >= i + 1}
            mouseIn={() => {
              handelmouseEnter(i + 1);
            }}
            mouseOut={() => handelmouseOut(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={pstyle}>
        {messages.length === maxrating
          ? messages[tempRating - 1] || messages[Rating - 1] || ""
          : tempRating || Rating || ""}
      </p>
    </div>
  );
}

function EmStar({ onRate, full, mouseIn, mouseOut, color, size }) {
  const starStyle = {
    width: size,
    height: "auto",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
    >
      {!full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
