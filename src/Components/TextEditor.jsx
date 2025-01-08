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

const TextEditor = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const { saveFile, activeFile } = useContext(folderContext);

  useEffect(() => {
    if (activeFile) {
      const sanitizedContent = DOMPurify.sanitize(activeFile.content);
      setContent(sanitizedContent);

      // Directly update the contentEditable div
      if (editorRef.current) {
        editorRef.current.innerHTML = sanitizedContent;
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
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white border-b">
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
