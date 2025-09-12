import ForUContainer from "@/components/FoUContainer";
import { useCatalog } from "@/hooks/useCatelog";
import { CatalogItem } from "@/types/catalog";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetInternal,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
// Component con của BottomSheet
function BottomSheetContent({ product, checkFilter, id, router }: { product: CatalogItem, checkFilter: any, id: string, router: any }) {
  const { animatedIndex } = useBottomSheetInternal();


  // Style animate cho header
  const headerStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(animatedIndex.value, [0, 1], [0, 0.25]),
      shadowRadius: interpolate(animatedIndex.value, [0, 1], [0, 6]),
      elevation: interpolate(animatedIndex.value, [0, 1], [0, 6]),
      backgroundColor: "white",
      paddingVertical: interpolate(animatedIndex.value, [0, 1], [16, 20]),
      paddingHorizontal: interpolate(animatedIndex.value, [0, 1], [16, 35]),
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(animatedIndex.value, [0, 1], [28, 20]),
      textAlign: interpolate(
        animatedIndex.value,
        [0, 1], [0, 1]
      ) as any,
    };
  });


  return (
    <View style={{ flex: 1 }}>
      {/* Header cố định */}
      <Animated.View style={[headerStyle, styles.header]}>
        <Animated.Text>{product.name}</Animated.Text>
        <Text className="text-gray-500">{product.createdAt}</Text>
      </Animated.View>


      {/* Nội dung scroll */}
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 80,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView className="flex-1">
          {/* Info section */}
          <View className="flex-row justify-between mb-6 mt-2 px-10">
            <View className="items-center">
              <Ionicons name="person-outline" size={20} color="green" />
              <Text className="text-md">x1</Text>
            </View>
            <View className="items-center">
              <Ionicons name="trending-up-outline" size={20} color="green" />
              <Text className="text-md">10</Text>
            </View>
            <View className="items-center">
              <Ionicons name="time-outline" size={20} color="green" />
              <Text className="text-md">1m</Text>
            </View>
            <View className="items-center">
              <Ionicons name="layers-outline" size={20} color="green" />
              <Text className="text-md">10</Text>
            </View>
            <View className="items-center">
              <Ionicons name="construct-outline" size={20} color="green" />
              <Text className="text-md">1</Text>
            </View>X
          </View>


          {/* Button */}
          <TouchableOpacity
            onPress={() => router.push(`/model3d/builder?id=${id}`)}
            className="bg-green-400 px-10 py-3 rounded-xl shadow-lg shadow-black mb-6 mx-4"
          >
            <Text className="text-center uppercase text-slate-200 font-bold text-lg">
              Start Build
            </Text>
          </TouchableOpacity>
          {/* Todo Desc */}

          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* Reference */}
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              className="px-10 my-4"
            >
              {product.properties.item3D?.files &&
                Object.values(product.properties.item3D.files).map((file, index) => (
                  <View key={index} className="items-center mx-2">
                    <Ionicons name="file-tray-full" size={20} color="green" />
                    <Text className="text-green-300">{file as string}</Text>
                  </View>
                ))
              }



            </ScrollView>
          </GestureHandlerRootView>

          {/* Images */}
          <ScrollView horizontal >
            {product.properties.image.map((item, index) => (
              <Image
                key={index}
                source={item as any}
                className="w-6 h-6"
                resizeMode="contain"
              />

            ))}
          </ScrollView>

          {/* Other Products */}
          <ForUContainer
            sectionTitle="Other Products"
            route="other"
            items={checkFilter}
            _id={id}
          />
        </ScrollView>
      </BottomSheetScrollView>
    </View>
  );
}


export default function Detail() {
  const { category, id } = useLocalSearchParams<{
    category: string;
    id: string;
  }>();
  const { items, loading } = useCatalog();

  const product = items.find((item) => item._id === id) // find item 
  const checkFilter = items.filter((item) => item.typeId === product?.typeId && item._id !== product._id) // find item 

  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "100%"], []);


  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Product not found</Text>
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Background */}
      <Image
        source={{ uri: product.properties.product?.item3D.files?.poster }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />


      {/* Nút back */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 bg-white/80 p-2 rounded-full z-10"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>


      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      >
        <BottomSheetContent product={product} checkFilter={checkFilter} id={id} router={router} />
      </BottomSheet>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    position: "absolute", // cố định header
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    padding: 12,
  },
  title: {
    fontWeight: "bold",
  },
});
