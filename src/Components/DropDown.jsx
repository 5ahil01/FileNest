import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ handleOnAddFileBtn, removeFolder, folderData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  function handleOnBlur() {
    if (buttonRef.current && buttonRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsOpen(false);
  }
  return (
    <div className="relative inline-block text-left" onBlur={handleOnBlur}>
      {/* Ellipsis Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <button
            ref={buttonRef}
            className="flex items-center gap-1 w-full px-4 py-2 text-left text-xs hover:bg-green-200"
            onClick={() => {
              handleOnAddFileBtn("file");
              setIsOpen(false); // Close dropdown after action
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> File
          </button>
          <button
            ref={buttonRef}
            className="flex items-center gap-1 w-full px-4 py-2 text-left text-xs hover:bg-green-200"
            onClick={() => {
              handleOnAddFileBtn("folder");
              setIsOpen(false); // Close dropdown after action
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Folder
          </button>
          <button
            className="flex items-center gap-1 w-full px-4 py-2 text-left text-xs text-black hover:bg-red-200"
            onClick={() => {
              removeFolder(folderData.id);
              setIsOpen(false); // Close dropdown after action
            }}
          >
            <FontAwesomeIcon icon={faTrash} /> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
