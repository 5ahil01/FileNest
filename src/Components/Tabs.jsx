import React, { useEffect, useState } from "react";
import Tab from "./Tab";

const Tabs = ({ tabList, activeFile }) => {
  return (
    <ul className="flex w-full h-10 bg-gray-100">
      {tabList.map((tab) => (
        <Tab tabData={tab} key={tab.id} activeFile={activeFile} />
      ))}
    </ul>
  );
};

export default Tabs;
