import { createContext, useReducer } from "react";

export const folderContext = createContext();

function folderReducer(state, action) {
  switch (action.type) {
    case "ADD_FOLDER": {
      if (
        state.folders.find(
          (folder) => folder.name === action.payload.newfolderName
        )
      ) {
        console.log("A folder with given name exist");
        return state;
      }

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

    case "ADD_FILE": {
      const folderIndex = state.folders.findIndex(
        (folder) => folder.id === action.payload.folderId
      );
      if (folderIndex === -1) {
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

    case "REMOVE_FOLDER": {
      const updatedFolders = state.folders.filter(
        (folder) => folder.id !== action.payload.folderId
      );
      return { ...state, folders: updatedFolders };
    }

    case "REMOVE_FILE": {
      const folderIndex = state.folders.findIndex(
        (folder) => folder.id === action.payload.folderId
      );
      if (folderIndex === -1) {
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

    case "PUSH_TO_TABLIST": {
      if (state.tabList.includes(action.payload.file)) {
        return state;
      }
      return { ...state, tabList: [...state.tabList, action.payload.file] };
    }

    case "REMOVE_FROM_TABLIST": {
      const updatedList = state.tabList.filter(
        (tab) => tab.id !== action.payload.tabId
      );

      //If activeFile is remove
      const fileToBeRemove = state.tabList.find(
        (tab) => tab.id === action.payload.tabId
      );
      if (state.activeFile.id === fileToBeRemove.id) {
        return { ...state, tabList: updatedList, activeFile: updatedList[0] };
      }

      return { ...state, tabList: updatedList };
    }

    case "SET_ACTIVE_FILE": {
      return { ...state, activeFile: action.payload.file };
    }

    case "SAVE_FILE": {
      const updatedFolders = state.folders.map((folder) => {
        return folder.id === action.payload.folderId
          ? {
              ...folder,
              files: folder.files.map((file) =>
                file.id === action.payload.fileId
                  ? { ...file, content: action.payload.updatedFileContent }
                  : file
              ),
            }
          : folder;
      });

      const updatedTabList = state.tabList.map((file) => {
        return file.id === action.payload.fileId
          ? {
              ...file,
              content: action.payload.updatedFileContent,
            }
          : file;
      });

      // const folderX = updatedFolders.find(
      //   (folder) => folder.id === action.payload.folderId
      // );

      // console.log(folderX.files);

      return {
        ...state,
        activeFile: {
          ...state.activeFile,
          content: action.payload.updatedFileContent,
        },
        tabList: updatedTabList,
        folders: updatedFolders,
      };
    }

    default:
      return state;
  }
}

export function FolderManagerContextProvider({ children }) {
  const [manager, dispatch] = useReducer(folderReducer, {
    folders: [],
    tabList: [],
    activeFile: null,
  });

  const values = {
    tabList: manager.tabList,
    folders: manager.folders,
    activeFile: manager.activeFile,
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
    setActiveFile: (file) =>
      dispatch({ type: "SET_ACTIVE_FILE", payload: { file } }),
    saveFile: (folderId, fileId, updatedFileContent) =>
      dispatch({
        type: "SAVE_FILE",
        payload: { folderId, fileId, updatedFileContent },
      }),
  };

  return (
    <folderContext.Provider value={values}>{children}</folderContext.Provider>
  );
}
