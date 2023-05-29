import React, { createContext, useState, ReactNode } from 'react';
import { ItemData } from '../models/IData';


type ItemsContext = {
  itemsData: ItemData[],
  setItemsData: React.Dispatch<React.SetStateAction<ItemData[]>>,
  addItem: (itemToAdd: ItemData) => void,
  removeItem: (idToRemove: number) => void,
}

type ItemsContextProviderProps = {
  children: ReactNode,
}

const ItemsContext = createContext<ItemsContext>(null);

function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  const [itemsData, setItemsData] = useState<ItemData[]>([]);

  function addItem(item: ItemData) {
    console.log('addItemContext ', item);
    setItemsData(prev => [...prev, item]);
  }

  function removeItem(idToRemove: number) {
    console.log('removeItemContext ', idToRemove);
    setItemsData(prev => prev.filter(({ id }) => id !== idToRemove));
  }

  return (
    <ItemsContext.Provider
      value={{
        itemsData,
        setItemsData,
        addItem,
        removeItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export { ItemsContextProvider };
export default ItemsContext;