import React, { useState, useRef } from "react";
import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import Folder from "./Folder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FolderManager = () => {
  const [folderName, setFolderName] = useState("");
  const [isInput, setIsInput] = useState(false);
  const { folders, addFolder } = useContext(folderContext);
  const buttonRef = useRef(null);

  const rootFolders = folders.filter((folder) => folder.parentId === "root");

  function createNewFolder() {
    if (folderName == "") return;
    addFolder(folderName, "root");
    setIsInput(false);
    setFolderName("");
  }

  function handleOnBlur(e) {
    if (buttonRef.current && buttonRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsInput(false);
    setFolderName("");
  }

  return (
    <div className="w-full md:w-80 p-4 md:p-6 border-b md:border-r md:border-b-0 border-gray-200 bg-white">
      <p className="text-2xl md:text-3xl font-semibold mb-4">FileNest</p>

      <div className="mb-2">
        <div>
          {!isInput && (
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">New Folder</p>
              <button
                onClick={() => setIsInput(true)}
                className="p-1 rounded text-white"
              >
                <FontAwesomeIcon icon={faPlus} className="text-teal-300" />
              </button>
            </div>
          )}
          {isInput && (
            <div className="flex items-center justify-between gap-2 border-2 ">
              <input
                type="text"
                placeholder="Enter folder name"
                className="h-8 w-[60%] px-3 flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black rounded"
                onChange={(e) => setFolderName(e.target.value)}
                onBlur={(e) => handleOnBlur(e)}
              />
              <button
                ref={buttonRef}
                onClick={createNewFolder}
                className="p-[0.4rem]  rounded-sm bg-black text-xs text-white"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul className="w-full">
        {rootFolders.map((folder) => (
          <li key={folder.id} className="bg-white">
            <Folder folderData={folder} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderManager;
