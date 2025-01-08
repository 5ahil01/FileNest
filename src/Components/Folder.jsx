import React, { useState, useContext, useRef } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faAngleDown,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import File from "./File";
import DropDown from "./DropDown";

const Folder = ({ folderData }) => {
  const { folders, addFolder, addFile, removeFolder } =
    useContext(folderContext);
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
    <div className="ml-2 ">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleOnClickFolder}
        >
          {showChildren ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
          <FontAwesomeIcon icon={faFolder} className="h-4 text-gray-600" />
          <p className="text-sm font-semibold">{folderData.name}</p>
        </div>
        <DropDown
          handleOnAddFileBtn={handleOnAddFileBtn}
          removeFolder={removeFolder}
          folderData={folderData}
        />
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
            className="ml-5 h-5 w-[60%] border border-gray-300  focus:outline-none focus:ring-[1px] focus:ring-black"
          />
          <button
            ref={buttonRef}
            onClick={() => handleCreateNewDoc(newName, showInput.docType)}
            className=" p-1 text-[0.4rem] text-black border-[1px] border-black   hover:bg-black hover:text-white"
          >
            <FontAwesomeIcon icon={faPlus} />
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
                <File file={file} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;
