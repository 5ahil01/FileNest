import { createContext, useReducer } from "react";

export const folderContext = createContext();

function folderReducer(state, action) {
  if (
    state.folders.find((folder) => folder.name === action.payload.newfolderName)
  ) {
    console.log("A folder with given name exist");
    return state;
  }
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

    if (
      selectedFolder.files.find(
        (file) => file.name === action.payload.newFileName
      )
    ) {
      console.log("A file with given name exist");
      return state;
    }

    const newFile = {
      id: `${selectedFolder.name}-${selectedFolder.files.length}`,
      name: action.payload.newFileName,
      content: "",
      parentId: action.payload.folderId,
      parentFolderName: action.payload.parentFolderName,
    };

    const updatedFolder = {
      ...selectedFolder,
      files: [...selectedFolder.files, newFile],
    };

    updatedFolders[folderIndex] = updatedFolder;
    return { ...state, folders: updatedFolders };
  }

  if (action.type == "REMOVE_FOLDER") {
    const updatedFolders = state.folders.filter(
      (folder) => folder.id !== action.payload.folderId
    );

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

  if (action.type == "PUSH_TO_TABLIST") {
    if (state.tabList.includes(action.payload.file)) {
      return state;
    }
    return { ...state, tabList: [...state.tabList, action.payload.file] };
  }

  if (action.type == "REMOVE_FROM_TABLIST") {
    const updatedList = state.tabList.filter(
      (tab) => tab.id !== action.payload.tabId
    );
    return { ...state, tabList: updatedList };
  }

  return state;
}

export function FolderManagerContextProvider({ children }) {
  const [manager, dispatch] = useReducer(folderReducer, {
    folders: [],
    tabList: [],
  });

  const values = {
    tabList: manager.tabList,
    folders: manager.folders,
    addFolder: (newfolderName, folderId) =>
      dispatch({ type: "ADD_FOLDER", payload: { newfolderName, folderId } }),
    addFile: (newFileName, folderId, parentFolderName) =>
      dispatch({
        type: "ADD_FILE",
        payload: { newFileName, folderId, parentFolderName },
      }),
    removeFolder: (folderId) =>
      dispatch({ type: "REMOVE_FOLDER", payload: { folderId } }),
    removeFile: (folderId, removeFileId) =>
      dispatch({ type: "REMOVE_FILE", payload: { folderId, removeFileId } }),
    addFileToTabList: (file) =>
      dispatch({ type: "PUSH_TO_TABLIST", payload: { file } }),
    removeFileFromTabList: (tabId) =>
      dispatch({ type: "REMOVE_FROM_TABLIST", payload: { tabId } }),
  };

  return (
    <folderContext.Provider value={values}>{children}</folderContext.Provider>
  );
}
