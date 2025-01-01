import { createContext, useReducer } from "react";

export const folderContext = createContext();

function folderReducer(state, action) {
  if (action.type == "ADD_FOLDER") {
    const newFolder = {
      id: state.folders.length,
      name: action.payload.newfolderName,
      childern: [],
      files: [],
      parentId: action.payload.folderId,
    };
    const updatedFolders = [...state.folders, newFolder];
    return { ...state, folders: [...updatedFolders] };
  }

  if (action.type == "ADD_FILE") {
    const folderIndex = state.folders.findIndex(
      (folder) => folder.id === action.payload.folderId
    );
    if (folderIndex == -1) {
      return state;
    }
    const updatedFolders = [...state.folders];

    const selectedFolder = updatedFolders[folderIndex];
    const newFile = {
      id: `${selectedFolder.name}-${selectedFolder.files.length}`,
      name: action.payload.newFileName,
      content: "",
      parentId: action.payload.folderId,
    };

    const updatedFolder = {
      ...selectedFolder,
      files: [...selectedFolder.files, newFile],
    };

    updatedFolders[folderIndex] = updatedFolder;
    return { ...state, folders: updatedFolders };
  }

  if (action.type == "REMOVE_FILE") {
    const folderIndex = state.folders.findIndex(
      (folder) => folder.id === action.payload.folderId
    );
    if (folderIndex == -1) {
      return state;
    }
    const updatedFolders = state.folders.map((folder, index) =>
      index === folderIndex
        ? {
            ...folder,
            files: folder.files.filter(
              (file) => file.id !== action.payload.removeFileId
            ),
          }
        : folder
    );

    return { ...state, folders: updatedFolders };
  }

  return state;
}

export function FolderManagerContextProvider({ children }) {
  const [manager, dispatch] = useReducer(folderReducer, { folders: [] });

  const valueObject = {
    folders: manager.folders,
    addFolder: (newfolderName, folderId) =>
      dispatch({ type: "ADD_FOLDER", payload: { newfolderName, folderId } }),
    addFile: (newFileName, folderId) =>
      dispatch({ type: "ADD_FILE", payload: { newFileName, folderId } }),
    removeFile: (folderId, removeFileId) =>
      dispatch({ type: "REMOVE_FILE", payload: { folderId, removeFileId } }),
  };

  return (
    <folderContext.Provider value={valueObject}>
      {children}
    </folderContext.Provider>
  );
}
