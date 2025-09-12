import ProductList from "@/components/ProductList";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogItem } from "@/types/catalog";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetInternal,
} from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// BottomSheet Scroll View
function BottomSheetContent({
  product,
  checkFilter,
  id,
}: {
  product: CatalogItem;
  checkFilter: CatalogItem[];
  id: string;
}) {
  // Animation Style
  const { animatedIndex } = useBottomSheetInternal();
  const headerStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(animatedIndex.value, [0, 1], [0, 0.25]),
      shadowRadius: interpolate(animatedIndex.value, [0, 1], [0, 6]),
      elevation: interpolate(animatedIndex.value, [0, 1], [0, 6]),
      backgroundColor: "#f1f2f6",
      paddingVertical: interpolate(animatedIndex.value, [0, 1], [0, 7]),
      paddingHorizontal: interpolate(animatedIndex.value, [0, 1], [16, 40]),
    };
  });
  const titleStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(animatedIndex.value, [0, 1], [18, 20]),
    };
  });
  const contentStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(animatedIndex.value, [0, 1], [70, 84]),
    };
  });

  // Memorize files & images
  const files = useMemo(() => {
    if (!product.properties.product.item3D?.files) return [];
    return Object.values(product.properties.product.item3D.files);
  }, [product.properties.product.item3D?.files]);
  const images = useMemo(() => {
    return product.properties.image ?? [];
  }, [product.properties.image]);

  return (
    <View className="flex-1 px-5">
      {/* Header cố định */}
      <Animated.View
        className="absolute top-0 left-0 right-0 z-10 p-3"
        style={[headerStyle]}
      >
        <Animated.Text style={[titleStyle]} className={"font-bold"}>
          {product.properties.product.item3D.name}
        </Animated.Text>
      </Animated.View>

      {/* Nội dung scroll */}
      <Animated.View style={contentStyle}>
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView className="flex-1">
            {/* Info section */}
            <View className="flex-row justify-between mb-6 px-14">
              <View className="items-center">
                <Ionicons name="person-outline" size={30} color="green" />
                <Text className="text-md">x1</Text>
              </View>
              <View className="items-center">
                <Ionicons name="trending-up-outline" size={30} color="green" />
                <Text className="text-md">10</Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={30} color="green" />
                <Text className="text-md">1m</Text>
              </View>
              <View className="items-center">
                <Ionicons name="layers-outline" size={30} color="green" />
                <Text className="text-md">10</Text>
              </View>
              <View className="items-center">
                <Ionicons name="construct-outline" size={30} color="green" />
                <Text className="text-md">1</Text>
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity
              onPress={() => router.push(`/model3d/page?id=${id}`)}
              className="bg-green-400 px-10 py-3 rounded-xl shadow-lg shadow-black mb-6 mx-20"
            >
              <Text className="text-center uppercase text-light font-extrabold text-xl">
                Start Build
              </Text>
            </TouchableOpacity>
            {/* Todo Desc */}

            {/* Reference Files */}
            {files.length > 0 && (
              <BottomSheetScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                className="px-10 my-4"
              >
                {files.map((file, index) => (
                  <View
                    key={index}
                    className="items-center mx-2"
                    style={{ width: 100 }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (file) {
                          Linking.openURL(file);
                        } else {
                          alert("File không tồn tại!");
                        }
                      }}
                      className="items-center"
                    >
                      <Ionicons
                        className="p-5"
                        name="file-tray-stacked-outline"
                        size={40}
                        color="green"
                      />
                      <Text numberOfLines={1} ellipsizeMode="tail">
                        {product.properties.product.item3D.name} sdfsdfasfdsf
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </BottomSheetScrollView>
            )}

            {/* Images */}
            {images.length > 0 && (
              <BottomSheetScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-10 my-6"
                contentContainerStyle={{ gap: 16 }}
              >
                {images.flat().map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    className="size-40 rounded-xl"
                    resizeMode="cover"
                  />
                ))}
              </BottomSheetScrollView>
            )}

            {/* Other Products */}
            {checkFilter.length > 0 && (
              <ProductList
                catalogName="Other Products"
                href="other"
                items={checkFilter}
                catalogId={product.typeId}
                mainColor="text-black"
                useBottomSheetScroll
              />
            )}
          </ScrollView>
        </BottomSheetScrollView>
      </Animated.View>
    </View>
  );
}

export default function Detail() {
  const { catalog, id } = useLocalSearchParams<{
    catalog: string;
    id: string;
  }>();
  const { items, loading } = useCatalog();

  const product = items.find((item) => item._id === id); // find item
  const checkFilter = items.filter(
    (item) => item.typeId === product?.typeId && item._id !== product._id
  ); // find item

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
    <SafeAreaView className="flex-1 bg-white">
      {/* Background */}
      <Image
        source={{ uri: product.properties.product?.item3D.files?.poster }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Nút back */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-4 bg-white/80 p-2 rounded-full z-10"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "#f1f2f6",
        }}
      >
        <BottomSheetContent
          product={product}
          checkFilter={checkFilter}
          id={id}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}
