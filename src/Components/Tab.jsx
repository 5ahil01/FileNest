import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Tab = ({ tabData, handleOnClickTab, removeFileFromTabList }) => {
  return (
    <li
      className="p-2   flex gap-2 items-center group relative "
      onClick={() => handleOnClickTab(tabData.id)}
    >
      <p>{`${tabData.name}/${tabData.parentFolderName}`}</p>
      <button
        className="invisible group-hover:visible"
        onClick={() => removeFileFromTabList(tabData.id)}
      >
        <FontAwesomeIcon icon={faX} className="h-3" />
      </button>
    </li>
  );
};

export default Tab;
