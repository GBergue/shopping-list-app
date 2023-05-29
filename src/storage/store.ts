import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

import { ItemData, ItemDataNoId } from '../models/IData'


function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");

  return db;
}

const db = openDatabase();

export function dropTable() {
  console.log('SQLITE - drop table items')
  db.transaction((tx) => {
    tx.executeSql(
      "drop table items;",
      [],
      (txObj, resultSet) => {
        console.log(resultSet)
      },
      (_, error) => {
        console.error(error)
        return false;
      }
    );
  });
}

export function createTable() {
  console.log('SQLITE - create table items')
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists items (id integer primary key not null, quantity int, description text, units text, category text, place text, addedAt );"
    );
  });
}

export function getItems(setItems: React.Dispatch<React.SetStateAction<ItemData[]>>) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from items",
      [],
      (_, { rows }) => {
        console.log('getItems ', rows); 
        setItems(rows._array);
      },
      (_, error) => {
        console.error(error)
        return false;
      },
    );
  });

  return [];
}

export function insertItem(data: ItemDataNoId, addItem: (item: ItemData) => void) {
  console.log('SQLite - insertItem')

  const {
    description,
    category,
    addedAt,
    place,
    quantity,
    unity,
  } = data;


  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO items (description, quantity, units, category, place, addedAt) values (?,?,?,?,?,?)",
      [description, quantity, unity, category, place, addedAt],
      (txObj, resultSet) => {
        const idInserted = resultSet.insertId;
        if (idInserted) {
          addItem({
            ...data,
            id: idInserted,
          });
        }
      },
      (_, error) => {
        console.error(error)
        return false;
      }
    );
  });
}

export function deleteItem(id: number) {
  db.transaction((tx) => {
    tx.executeSql(
      "delete from items where id = ?",
      [id],
      (txObj, resultSet) => {
        console.log(resultSet)
      },
      (_, error) => {
        console.error(error)
        return false;
      }
    );
  });
}


// export const storage = new MMKV()

// const KEY_ITEMS = 'ITEMS'


// export function saveItems(data: ItemData[]) {
//   storage.set(KEY_ITEMS, JSON.stringify(data))
// }

// export function getItems(): ItemData[] {
//   const json = storage.getString(KEY_ITEMS)
  
//   if (json) {
//     return JSON.parse(json)
//   }

//   return [];
// }
