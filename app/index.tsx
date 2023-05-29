import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRouter, Stack } from "expo-router";
import { FAB } from "@rneui/themed";
import { SearchBar } from "@rneui/themed";
import { useSafeAreaInsets  } from 'react-native-safe-area-context';

import { THEME } from "../src/theme/theme";
import { deleteItem, getItems } from "../src/storage/store";
import ItemsContext from "../src/context/ItemDataContext";
import CardItem from "../src/components/CardItem";


export default function Home() {
  const { top, bottom } = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const { itemsData, setItemsData, removeItem } = useContext(ItemsContext);
  const router = useRouter();

  useEffect(() => {
    getItems(setItemsData);
  }, []);
  

  function updateSearch(search: string) {
    setSearch(search);
  }

  function handleDelete(id: number) {
    deleteItem(id);
    removeItem(id);
  }

  return (
      <View style={styles.container}>
        <View style={{ paddingTop: top, paddingBottom: bottom }}>

        
        <Stack.Screen options={{ headerShown: false }} />

        <SearchBar
          placeholder="pesquise aqui..."
          onChangeText={updateSearch}
          value={search}
        />

        </View>

        <FlatList
          data={itemsData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return <CardItem item={item} handleDelete={handleDelete} />
          }}
        />

      <View style={styles.fab}>
        <FAB
          visible
          color={THEME.colors.primary[700]}
          icon={{ name: "add", color: "white" }}
          size="large"
          onPress={() => router.push('/add')}
        />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.gray[400],
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  }
});
