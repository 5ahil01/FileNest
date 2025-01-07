import React, { useState } from "react";
import { FolderManagerContextProvider } from "./Store/FolderManagerContext";
import FolderManager from "./Components/FolderManager";
import Display from "./Components/Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">
      <FolderManagerContextProvider>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 right-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon={showSidebar ? faTimes : faBars}
            className="text-gray-700"
          />
        </button>

        {/*Black transparent Overlay on right*/}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div
          className={`
          fixed md:static top-0 left-0 h-full w-[80%] md:w-80
          transition-transform duration-300 ease-in-out
          ${
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          z-40 bg-white shadow-lg md:shadow-none
        `}
        >
          <FolderManager />
        </div>

        <main className="flex-1 md:pl-0">
          <Display />
        </main>
      </FolderManagerContextProvider>
    </div>
  );
};

export default App;
