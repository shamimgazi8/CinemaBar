import React from "react";

export function Waring({ searchWord }) {
  return (
    <div>
      <p className="warning">"{searchWord}" Movies is Not Found⛔⛔</p>
    </div>
  );
}
