import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import SearchDialogModal from './SearchDialogModal';

export default function Sidebar(props: DrawerContentComponentProps) {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

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
        } catch (e) {
            console.error(e);
        }
    };

    const openSearchModal = () => {
        setModalVisible(true);
    };

    return (
        <>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="restaurant" size={32} color={Colors.light.primary} />
                    </View>
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
                        <Ionicons name="search-outline" size={24} color={Colors.light.gray} />
                        <Text style={styles.searchButtonText}>Cari Resep</Text>
                    </TouchableOpacity>

                    <DrawerItemList {...props} />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color={Colors.light.gray} />
                        <Text style={styles.logoutText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

            <SearchDialogModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
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
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        marginBottom: 10,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    searchButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.gray,
        marginLeft: 18,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    logoutText: {
        fontSize: 16,
        color: Colors.light.gray,
        fontWeight: '500',
    },
});
