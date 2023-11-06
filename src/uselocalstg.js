import { useState, useEffect } from "react";
export function Uselocalstg(initState, key) {
  const [VALUE, setVALUE] = useState(function () {
    const storevalue = localStorage.getItem("key");
    return storevalue ? JSON.parse(storevalue) : initState;
  });
  useEffect(
    function () {
      localStorage.setItem("key", JSON.stringify(VALUE));
    },
    [VALUE, key]
  );
  return [VALUE, setVALUE];
}
