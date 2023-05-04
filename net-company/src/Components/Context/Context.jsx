import React, { createContext, useContext, useMemo, useState } from "react";

const context = createContext();

export const useCont = () => {
  return useContext(context);
};

export const Context = ({ children }) => {
  const [id, setId] = useState(0);

  return (
    <div>
      <context.Provider value={{ id, setId }}>{children}</context.Provider>
    </div>
  );
};

export default Context;
