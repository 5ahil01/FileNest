import React, { useState, useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import File from "./File";

const Folder = ({ folderData }) => {
  const { folders, addFolder, addFile, removeFile } = useContext(folderContext);
  const [newName, setNewName] = useState("");

  const childrenFolders = folders.filter(
    (folder) => folder.parentId === folderData.id
  );

  const childrenFiles = folderData.files;

  function handleAddNewDoc(docName, docType) {
    if (docName === "") {
      docName = docType === "folder" ? "NewFolder" : "NewFile";
    }

    docType === "folder"
      ? addFolder(docName, folderData.id)
      : addFile(docName, folderData.id);
  }

  return (
    <div className="ml-1">
      <div className="flex gap-1">
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faFolder} />
          <p>{folderData.name}</p>
        </div>
        <div className="ml-4 flex gap-1 items-center ">
          <button onClick={() => handleAddNewDoc(newName, "file")}>
            <FontAwesomeIcon icon={faPlus} /> <span>File</span>
          </button>
          <button onClick={() => handleAddNewDoc(newName, "folder")}>
            <FontAwesomeIcon icon={faPlus} /> <span>Folder</span>
          </button>
        </div>
      </div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border-2 border-black"
      />

      <div>
        <ul className="ml-2">
          {childrenFolders.map((folder) => (
            <li key={folder.id}>
              <Folder folderData={folder} />
            </li>
          ))}
        </ul>
        <ul>
          {childrenFiles.map((file) => (
            <li key={file.id}>
              <File
                file={file}
                removeFile={() => removeFile(folderData.id, file.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Folder;
