import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFile } from "@fortawesome/free-solid-svg-icons";

const File = ({ file, removeFile, handleOnClickFile }) => {
  return (
    <div className="ml-4 flex gap-5">
      <div className="flex items-center gap-1" onClick={handleOnClickFile}>
        <FontAwesomeIcon icon={faFile} />
        <p> {file.name}</p>
      </div>

      <button
        className="px-2 py-1 text-xs bg-black text-white rounded hover:bg-red-600"
        onClick={removeFile}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default File;
