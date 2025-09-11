import { CatalogProvider } from "@/Context/CatalogContext";
import { Stack } from "expo-router";
import "./gobals.css";
export default function RootLayout() {
  return (
    <CatalogProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[category]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </CatalogProvider>

  );
}
