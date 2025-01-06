import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import Tabs from "./Tabs";
import DisplayFile from "./DisplayFile";

const Display = () => {
  const { tabList, activeFile } = useContext(folderContext);
  return (
    <div className="p-[0.10rem] flex flex-col relative w-full h-screen overflow-hidden bg-gray-100">
      <Tabs tabList={tabList} activeFile={activeFile} />
      <DisplayFile activeFileData={activeFile} tabListLength={tabList.length} />
    </div>
  );
};

export default Display;
