import React, { useState, useEffect, useRef, useContext } from "react";
import DOMPurify from "dompurify";
import { folderContext } from "../Store/FolderManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";

const TextEditor = ({ activeFile }) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const { saveFile } = useContext(folderContext);

  useEffect(() => {
    console.log(activeFile);
    const savedContent = activeFile.content;

    if (savedContent) {
      setContent(savedContent);
      // Set initial content if exists
      if (editorRef.current) {
        editorRef.current.innerHTML = DOMPurify.sanitize(savedContent);
      }
    }
  }, [activeFile]);

  const handleInput = (e) => {
    setContent(e.currentTarget.innerHTML);
  };

  const applyCommand = (command) => {
    document.execCommand(command, false, null);
  };

  const handleSaveShortcut = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      console.log("Run hua");
      saveFile(activeFile.parentId, activeFile.id, content);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div className="w-full h-full p-4 border rounded shadow  mx-auto ">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => applyCommand("bold")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={() => applyCommand("italic")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={() => applyCommand("underline")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          onClick={() => applyCommand("justifyLeft")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button
          onClick={() => applyCommand("justifyCenter")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button
          onClick={() => applyCommand("justifyRight")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </button>

        <button
          onClick={() => saveFile(activeFile.parentId, activeFile.id, content)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
      <div
        ref={editorRef}
        className="border p-4 rounded bg-white min-h-[200px] h-[80%] focus:outline-none"
        contentEditable
        onInput={handleInput}
      />
    </div>
  );
};

export default TextEditor;
