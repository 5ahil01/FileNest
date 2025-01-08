import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import Tabs from "./Tabs";
import DisplayFile from "./DisplayFile";

const Display = () => {
  const { tabList, activeFile } = useContext(folderContext);
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <Tabs tabList={tabList} activeFile={activeFile} />
      </div>
      <div className="flex-1 p-4 ">
        <DisplayFile
          activeFileData={activeFile}
          tabListLength={tabList.length}
        />
      </div>
    </div>
  );
};

export default Display;
