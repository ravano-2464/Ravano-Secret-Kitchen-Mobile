import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import LogoutModal from './LogoutModal';
import SearchDialogModal from './SearchDialogModal';

export default function Sidebar(props: DrawerContentComponentProps) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userStr = await AsyncStorage.getItem('user');
            if (userStr) {
                setUser(JSON.parse(userStr));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            router.replace('/(auth)/login');
            Toast.show({
                type: 'success',
                text1: 'Berhasil Keluar',
                text2: 'Sampai jumpa lagi!',
            });
        } catch (e) {
            console.error(e);
        }
    };

    const openSearchModal = () => {
        setModalVisible(true);
    };

    return (
        <>
            <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, { backgroundColor: colors.primary }]} style={{ backgroundColor: colors.primary }}>
                <View style={[styles.header, { backgroundColor: colors.primary }]}>
                    <Image
                        source={require('../public/logo/Ravano-Secret-Kitchen-Logo.webp')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name || 'Pengguna'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={openSearchModal}
                    >
                        <Ionicons name="search-outline" size={24} color="#fff" />
                        <Text style={styles.searchButtonText}>Cari Resep</Text>
                    </TouchableOpacity>

                    <DrawerItemList {...props} />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
                        <Ionicons name="log-out-outline" size={24} color="#fff" />
                        <Text style={styles.logoutText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

            <SearchDialogModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <LogoutModal
                visible={logoutModalVisible}
                onClose={() => setLogoutModalVisible(false)}
                onConfirm={handleLogout}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    logoImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    menuContainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 16,
        gap: 10,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    searchButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        marginLeft: 18,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    logoutText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
});
