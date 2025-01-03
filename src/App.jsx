import React from "react";
import { FolderManagerContextProvider } from "./Store/FolderManagerContext";
import FolderManager from "./Components/FolderManager";
import Display from "./Components/Display";

const App = () => {
  return (
    <div className="flex">
      <FolderManagerContextProvider>
        <FolderManager />
        <Display />
      </FolderManagerContextProvider>
    </div>
  );
};

export default App;
