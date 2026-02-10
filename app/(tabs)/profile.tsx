import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Colors from '../../constants/Colors';

export default function ProfileScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userStr = await AsyncStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                setUserName(user.name || 'User');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        Toast.show({
            type: 'success',
            text1: 'Logout Berhasil',
            text2: 'Sampai jumpa lagi!'
        });
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={40} color="#fff" />
                </View>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.role}>Pengguna</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="settings-outline" size={22} color={Colors.light.text} />
                    <Text style={styles.menuText}>Pengaturan</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.light.gray} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="help-circle-outline" size={22} color={Colors.light.text} />
                    <Text style={styles.menuText}>Bantuan</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.light.gray} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color={Colors.light.error} />
                    <Text style={[styles.menuText, styles.logoutText]}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: Colors.light.card,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        color: Colors.light.gray,
    },
    menuContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    menuText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: Colors.light.text,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 20,
        borderColor: Colors.light.error,
    },
    logoutText: {
        color: Colors.light.error,
    },
});
