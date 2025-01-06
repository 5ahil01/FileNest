import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { folderContext } from "../Store/FolderManagerContext";

const Tab = ({ tabData, activeFile }) => {
  const { setActiveFile, removeFileFromTabList } = useContext(folderContext);

  let tabCssClass =
    "px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-t-md group cursor-pointer hover:bg-gray-200";

  if (activeFile.id === tabData.id) {
    tabCssClass += " border-b-4 border-teal-400 ";
  }
  return (
    <li
      className={tabCssClass}
      onClick={() => {
        setActiveFile(tabData);
      }}
    >
      <p className="truncate">{`${tabData.name}/${tabData.parentFolderName}`}</p>
      <button
        className="ml-2 p-1 flex items-center invisible group-hover:visible  "
        onClick={(e) => {
          e.stopPropagation();
          removeFileFromTabList(tabData.id);
        }}
      >
        <FontAwesomeIcon icon={faX} className="h-2" />
      </button>
    </li>
  );
};

export default Tab;
