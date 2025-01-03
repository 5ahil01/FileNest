import React from "react";
import Tab from "./Tab";

const Tabs = ({ tabList, handleOnClickTab, removeFileFromTabList }) => {
  return (
    <ul className="flex w-full h-8 border-2 border-black">
      {tabList.map((tab) => (
        <Tab
          tabData={tab}
          key={tab.id}
          handleOnClickTab={handleOnClickTab}
          removeFileFromTabList={removeFileFromTabList}
        />
      ))}
    </ul>
  );
};

export default Tabs;
