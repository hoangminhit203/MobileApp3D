import { CatalogProvider } from "@/Context/CatalogContext";
import { Stack } from "expo-router";
import "./globals.css";

// Import WebGL fixes early to suppress EXGL errors
import "@/utils/webglFixes";

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
          name="[catalog]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="model3d/page"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="model3d/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </CatalogProvider>

  );
}
