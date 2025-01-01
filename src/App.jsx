import React from "react";
import { FolderManagerContextProvider } from "./Store/FolderManagerContext";
import FolderManager from "./Components/FolderManager";

const App = () => {
  return (
    <div>
      <FolderManagerContextProvider>
        <FolderManager />
      </FolderManagerContextProvider>
    </div>
  );
};

export default App;
