import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ handleOnAddFileBtn, removeFolder, folderData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Ellipsis Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <button
            className="flex items-center gap-1 w-full px-4 py-2 text-left text-xs hover:bg-green-200"
            onClick={() => {
              handleOnAddFileBtn("file");
              setIsOpen(false); // Close dropdown after action
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> File
          </button>
          <button
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
