import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <div className="w-6xl mx-auto px-4 py-10">{children}</div>;
}

export default layout;
