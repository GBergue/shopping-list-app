import { Stack } from "expo-router/stack";
import { THEME } from "../src/theme/theme";
import { useEffect } from "react";
import { createTable, dropTable } from "../src/storage/store";
import { ItemsContextProvider } from "../src/context/ItemDataContext";

export default function Layout() {
  useEffect(() => {
    //dropTable();
    createTable();
  }, []);

  return (
    <ItemsContextProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerStyle: {
            backgroundColor: THEME.colors.gray[300],
          },
          headerTintColor: THEME.colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </ItemsContextProvider>
  );
}
