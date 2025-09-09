import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from 'react';
import { Image, View } from 'react-native';

const TabIcon = ({ icon, focused }: { icon: any, focused: boolean }) => {
    return (
        <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-60'}`}>
            <Image
                source={icon}
                className="w-6 h-6"
                style={{ tintColor: focused ? '#ffffff' : '#cccccc' }}
                resizeMode="contain"
            />
        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#cccccc',
                tabBarStyle: {
                    backgroundColor: '#000055',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5E7',
                    height: 84,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.Home} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.search} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.profile} focused={focused} />
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout