import React, { useState } from "react";
import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import Tabs from "./Tabs";
import DisplayFile from "./DisplayFile";

const Display = () => {
  const { tabList, removeFileFromTabList } = useContext(folderContext);
  const [activeFile, setActiveFile] = useState();

  function handleOnClickTab(activeTabId) {
    const checkFile = tabList.find((tab) => tab.id === activeTabId);
    if (checkFile) {
      setActiveFile(checkFile);
    }
  }

  return (
    <div className="flex flex-col relative w-full h-screen  overflow-hidden bg-gray-100">
      <Tabs
        tabList={tabList}
        handleOnClickTab={handleOnClickTab}
        removeFileFromTabList={removeFileFromTabList}
      />
      <DisplayFile activeFileData={activeFile} />
    </div>
  );
};

export default Display;
