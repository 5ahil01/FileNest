import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFile } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";

const File = ({ file }) => {
  const { addFileToTabList, setActiveFile, removeFile, removeFileFromTabList } =
    useContext(folderContext);

  function handleOnClickAndSetFile() {
    addFileToTabList(file);
    setActiveFile(file);
  }

  function handleOnRemoveBtn() {
    removeFile(file.parentId, file.id);
    removeFileFromTabList(file.id);
  }

  return (
    <div className="ml-4 mt-1 flex justify-between gap-5 cursor-pointer">
      <div
        className="text-gray-600 flex items-center gap-1"
        onClick={handleOnClickAndSetFile}
      >
        <FontAwesomeIcon icon={faFile} />
        <p> {file.name}</p>
      </div>

      <button
        className="px-2 py-1 text-xs text-gray-500 rounded hover:bg-red-200"
        onClick={handleOnRemoveBtn}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default File;
