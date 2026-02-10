import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Sidebar from '@/components/Sidebar';

const DrawerToggle = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity onPress={toggleDrawer} style={{ marginLeft: 16 }}>
      <Ionicons name="menu" size={28} color={Colors[colorScheme ?? 'light'].text} />
    </TouchableOpacity>
  );
};

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props: any) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: 'rgba(255, 255, 255, 0.8)',
        drawerActiveBackgroundColor: 'rgba(255, 255, 255, 0.2)',
        drawerLabelStyle: {
          marginLeft: 10,
        },
        drawerItemStyle: {
          marginVertical: 6,
          borderRadius: 8,
        },
        headerLeft: () => <DrawerToggle />,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Beranda',
          title: 'Beranda',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profil',
          title: 'Profil',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
