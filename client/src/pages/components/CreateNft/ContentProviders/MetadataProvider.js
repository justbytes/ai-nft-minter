import React, { createContext, useState } from 'react';

const MetadataHashContext = createContext();

export function MetadataHashProvider({ children }) {
  const [metadataHash, setMetadataHash] = useState('');

  return (
    <MetadataHashContext.Provider value={{ metadataHash, setMetadataHash }}>
      {children}
    </MetadataHashContext.Provider>
  );
}

export default MetadataHashContext;
