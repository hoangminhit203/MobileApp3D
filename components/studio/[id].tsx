import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImportStudio() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, tab: queryTab } = route.params || {};

  const [catalog, setCatalog] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(queryTab || "part");
  const validTabs = ["part", "tutorial", "multiActions"];

  // Fetch catalog bằng fetch API
  const fetchCatalog = async (catalogId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://your-api.com/catalog/items?slut=${catalogId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setCatalog(data);
    } catch (error) {
      console.error("Error fetching catalog:", error);
      navigation.goBack(); // giống createError(404)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!validTabs.includes(tab)) {
      setTab("part");
    }
    fetchCatalog(id);
  }, [id]);

  const updateTab = (newTab: string) => {
    if (!validTabs.includes(newTab)) {
      setTab("part");
      return;
    }
    setTab(newTab);
    navigation.setParams({ id, tab: newTab });
    if (newTab === "tutorial") {
      fetchCatalog(id);
    }
  };

  // Save TTS bằng fetch
  const saveTts = async (step: number, tts: string) => {
    try {
      const updatedSteps =
        catalog.properties.product.instructions.tutorials.step;
      updatedSteps[step].tts = tts;

      const res = await fetch("https://your-api.com/catalog/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            "properties.product.instructions.tutorials.step": updatedSteps,
          },
          slut: id,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const result = await res.json();
      console.log("TTS updated:", result);
    } catch (error) {
      console.error("Error saving TTS:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading || !catalog ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-lg mt-2">Loading...</Text>
        </View>
      ) : (
        <View className="flex-1">
          {tab === "part" && (
            <Text className="text-xl text-center mt-4">
              Part Order View for {catalog.properties.product.name}
            </Text>
          )}

          {tab === "tutorial" && (
            <Text className="text-xl text-center mt-4">Tutorial View</Text>
          )}

          {/* Nút đổi tab */}
          <View className="absolute top-4 left-4">
            {validTabs.map((t) => (
              <TouchableOpacity
                key={t}
                className={`p-2 rounded-xl m-1 ${tab === t ? "bg-blue-500" : "bg-gray-300"
                  }`}
                onPress={() => updateTab(t)}
              >
                <Text className="text-white">{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
