import React, { useState, createContext, useEffect, useContext } from "react";

// Replace this with the URL of your dictionary API.
const dictionaryURL = "";

export const DictionaryContext = createContext();

export function DictionaryProvider({ children }) {
  const [dictionary, setDictionary] = useState({});
  const [isLoadingDictionary, setIsLoadingDictionary] = useState(true);

  useEffect(() => {
    fetch(dictionaryURL)
      .then((response) => response.json())
      .then((json) => {
        setDictionary(json);
        setIsLoadingDictionary(false);
      })
      .catch(console.error);
  }, []);

  const contextValues = {
    dictionary,
    isLoadingDictionary,
  };

  return (
    <DictionaryContext.Provider value={contextValues}>
      {children}
    </DictionaryContext.Provider>
  );
}
