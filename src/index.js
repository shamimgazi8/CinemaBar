import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StarRating from "./starRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
// function Test() {
//   const [movieRate, setMovieRate] = useState(0);
//   return (
//     <div>
//       <StarRating
//         messages={["Tarrible", "Bad", "Okay", "Good", "Excellent"]}
//         maxrating={5}
//         color="blue"
//         setRating={setMovieRate}
//       />
//       <p>This movie Rating is {movieRate} </p>
//     </div>
//   );
// }
root.render(
  <React.StrictMode>
    <App />
    {/* <Test /> */}
  </React.StrictMode>
);
