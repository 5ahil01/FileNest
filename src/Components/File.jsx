import React from "react";

const File = ({ file, removeFile }) => {
  return (
    <div className="flex gap-5">
      <p> {file.name}</p>
      <button onClick={removeFile}>del</button>
    </div>
  );
};

export default File;
