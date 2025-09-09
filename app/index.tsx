import { ScrollView, Text } from "react-native";
import { ForUContainer } from "../components";

export default function App() {
  const seed = [
    {
      id: "1",
      title: "Modern",
      category: "Perfect for dining rooms",
      code: "A-DIY",
      imageUrl: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "2",
      title: "Wooden Chair",
      category: "Perfect for dining rooms",
      code: "A-DIY",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0Oc9tGIzrpArxdS1fwqz1vI8jrVMefimow&s",
    },
    {
      id: "3",
      title: "Coffee Table",
      category: "Compact and stylish",
      code: "A-DIY", 
      imageUrl: "https://reactjs.org/logo-og.png",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-10">
      <Text className="uppercase text-2xl font-extrabold mb-10">For You</Text>

      <ForUContainer sectionTitle="Now Popular in Furniture" items={seed} />
      <ForUContainer sectionTitle="Now Popular in Electronics" items={seed} />
      <ForUContainer sectionTitle="Now Popular in sports" items={seed} />
    </ScrollView>
  );
}