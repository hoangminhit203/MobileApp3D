import { useCatalog } from "@/hooks/useCatalog";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Model3DPage = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const { items, loading } = useCatalog();
  const product = items.find((item) => item._id === id);
  return (
    // Dùng id này để hiện từng sản phẩm 3d lên cho app mobile
    <SafeAreaView>
      <Text>{product?.name} </Text>
    </SafeAreaView>
  );
};
export default Model3DPage;
