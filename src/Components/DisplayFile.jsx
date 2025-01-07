import React from "react";
import TextEditor from "./TextEditor";

const DisplayFile = ({ activeFileData, tabListLength }) => {
  return (
    <div className="flex-1 ">
      {activeFileData && tabListLength > 0 && (
        <TextEditor activeFile={activeFileData} />
      )}
      {(!activeFileData || tabListLength === 0) && (
        <div className="w-full h-full flex items-center justify-center ">
          <p className="text-xl">Select any file from folder manager</p>
        </div>
      )}
    </div>
  );
};

export default DisplayFile;
