import React, { useState, useContext, useRef } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFolder,
  faPlus,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import File from "./File";

const Folder = ({ folderData }) => {
  const {
    folders,
    addFolder,
    addFile,
    removeFile,
    removeFolder,
    addFileToTabList,
  } = useContext(folderContext);
  const [newName, setNewName] = useState("");
  const [showChildren, setShowChildren] = useState(false);
  const [showInput, setShowInput] = useState({
    input: false,
    docType: "file",
  });
  const buttonRef = useRef(null);

  const childrenFolders = folders.filter(
    (folder) => folder.parentId === folderData.id
  );
  const childrenFiles = folderData.files;

  function handleCreateNewDoc(docName, docType) {
    if (docName === "") {
      docName = docType === "folder" ? "NewFolder" : "NewFile";
    }

    docType === "folder"
      ? addFolder(docName, folderData.id)
      : addFile(docName, folderData.id, folderData.name);
    setShowChildren(true);
    setShowInput({ input: false, docType: "" });
    setNewName("");
  }

  function handleOnClickFolder() {
    setShowChildren((prev) => !prev);
  }

  function handleOnAddFileBtn(docType) {
    setShowInput(() => {
      return {
        input: true,
        docType: docType,
      };
    });
  }

  function handleOnBlur(e) {
    if (buttonRef.current && buttonRef.current.contains(e.relatedTarget)) {
      return;
    }
    setShowInput({ input: false, docType: "" });
    setNewName("");
  }

  return (
    <div className="ml-3">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleOnClickFolder}
        >
          {showChildren ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
          <FontAwesomeIcon icon={faFolder} />
          <p className="font-medium">{folderData.name}</p>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button
            className="flex items-center gap-1 px-2 py-1 text-xs bg-black text-white rounded hover:bg-blue-600"
            onClick={() => handleOnAddFileBtn("file")}
          >
            <FontAwesomeIcon icon={faPlus} /> File
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 text-xs bg-black text-white rounded hover:bg-green-600"
            onClick={() => handleOnAddFileBtn("folder")}
          >
            <FontAwesomeIcon icon={faPlus} /> Folder
          </button>
          <button
            className="px-2 py-1 text-xs bg-black text-white rounded hover:bg-red-600"
            onClick={() => removeFolder(folderData.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {showInput.input && (
        <div
          className="mt-2 flex items-center gap-2"
          onBlur={handleOnBlur}
          tabIndex={-1}
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            ref={buttonRef}
            onClick={() => handleCreateNewDoc(newName, showInput.docType)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      )}
      {showChildren && (
        <div className="mt-2">
          <ul className="ml-4">
            {childrenFolders.map((folder) => (
              <li key={folder.id}>
                <Folder folderData={folder} />
              </li>
            ))}
          </ul>
          <ul className="ml-4">
            {childrenFiles.map((file) => (
              <li key={file.id}>
                <File
                  file={file}
                  removeFile={() => removeFile(folderData.id, file.id)}
                  handleOnClickFile={() => addFileToTabList(file)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;
