// Context.js (create a new file)
import React, { createContext, useState } from "react";

const SubjectContext = createContext(null);

const SubjectProvider = ({ children }) => {
  const [subject, setSubject] = useState("");

  const selectSubject = (newSubject) => {
    setSubject(newSubject);
  };

  return (
    <SubjectContext.Provider value={{ subject, selectSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export { SubjectContext, SubjectProvider };
