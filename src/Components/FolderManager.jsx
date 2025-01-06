import React, { useState } from "react";
import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import Folder from "./Folder";

const FolderManager = () => {
  const [folderName, setFolderName] = useState("NewFolder");
  const { folders, addFolder } = useContext(folderContext);

  const rootFolders = folders.filter((folder) => folder.parentId === "root");

  function createNewFolder() {
    addFolder(folderName, "root");
  }

  return (
    <div className="p-6 bg-gray-500 min-h-screen border-r-2 border-black">
      <div className="mb-6">
        <p className="text-3xl font-semibold mb-4 text-white">Files and Docs</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter folder name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            onClick={createNewFolder}
            className="px-4 py-2 bg-black text-white rounded-md "
          >
            Create Folder
          </button>
        </div>
      </div>

      <div>
        <ul className="w-[400px]">
          {rootFolders.map((folder) => (
            <li key={folder.id} className="bg-white shadow rounded-md p-4 ">
              <Folder folderData={folder} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderManager;
