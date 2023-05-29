import { View, StyleSheet, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import { THEME } from "../src/theme/theme";
import { useRouter, Stack } from "expo-router";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/themed";

import { ItemDataNoId } from "../src/models/IData";
import { insertItem } from "../src/storage/store";
import ItemsContext from "../src/context/ItemDataContext";

export default function Add() {
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [units, setUnits] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [place, setPlace] = React.useState("");
  const { addItem } = useContext(ItemsContext);
  
  const router = useRouter();


  function handleAddItem() {
    const itemData: ItemDataNoId = {
      category,
      place,
      addedAt: new Date().getTime().toString(),
      description,
      quantity,
      unity: units,
    };
    console.log("ADD ", itemData);

    ToastAndroid.showWithGravity(
      "Item saved!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );

    insertItem(itemData, addItem);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Adicionar item",
        }}
      />

      <View style={{ marginTop: 16 }}>
        <Input
          placeholder="Description"
          value={description}
          onChangeText={(value) => setDescription(value)}
          style={{ color: "white" }}
        />
      </View>

      <Input
        style={{ color: "white" }}
        placeholder="Quantity"
        keyboardType="number-pad"
        onChangeText={(value) => {
          const num = Number(value);

          if (num) setQuantity(num);
        }}
      />

      <Input
        style={{ color: "white" }}
        placeholder="Units"
        onChangeText={(value) => setUnits(value)}
      />

      <Input
        style={{ color: "white" }}
        placeholder="Category"
        onChangeText={(value) => setCategory(value)}
      />

      <Input
        style={{ color: "white" }}
        placeholder="Place"
        onChangeText={(value) => setPlace(value)}
      />

      <Button
        title="Add"
        onPress={() => handleAddItem()}
        containerStyle={{
          width: "100%",
        }}
        buttonStyle={{
          backgroundColor: THEME.colors.green[700],
          borderRadius: 30,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.gray[400],
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
