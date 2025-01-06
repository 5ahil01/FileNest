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

  function handleOnBlur() {
    if (buttonRef.current && buttonRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsInput(false);
    setFolderName("");
  }

  return (
    <div className="p-6 min-h-screen border-r-[0.5px] border-gray-200">
      <p className="text-3xl font-semibold mb-4">Files and Docs</p>

      <div className="mb-2">
        <div>
          {!isInput && (
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">New Folder</p>
              <button
                onClick={() => setIsInput(true)}
                className=" p-1 text-2  rounded  text-white flex justify-center   "
              >
                <FontAwesomeIcon icon={faPlus} className="text-teal-300" />
              </button>
            </div>
          )}
          {isInput && (
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter folder name"
                className="h-5 p-3 w-[80%] border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setFolderName(e.target.value)}
                onBlur={handleOnBlur}
              />
              <button
                ref={buttonRef}
                onClick={createNewFolder}
                className=" p-2 rounded-sm bg-black text-white flex justify-center   "
              >
                <FontAwesomeIcon icon={faPlus} className="h-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul className="w-64">
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
