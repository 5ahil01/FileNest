import React from "react";

const DisplayFile = ({ activeFileData }) => {
  console.log(activeFileData);
  return (
    <div className="flex-1 border-2 border-black">
      {activeFileData && (
        <div>
          {activeFileData.id} -- {activeFileData.name}
        </div>
      )}
      {!activeFileData && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-xl">Select any file from folder manager</p>
        </div>
      )}
    </div>
  );
};

export default DisplayFile;
