import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Colors from '../../constants/Colors';
import LogoutModal from '../../components/LogoutModal';
import SettingsModal from '../../components/SettingsModal';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ProfileScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [userName, setUserName] = useState('User');
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);

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
        setLogoutModalVisible(false);
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
                    <Ionicons name="person" size={40} color="#fff" />
                </View>
                <Text style={[styles.name, { color: colors.text }]}>{userName}</Text>
                <Text style={[styles.role, { color: colors.gray }]}>Pengguna</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => setSettingsModalVisible(true)}
                >
                    <Ionicons name="settings-outline" size={22} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Pengaturan</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Ionicons name="help-circle-outline" size={22} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Bantuan</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuItem, styles.logoutButton, { backgroundColor: colors.card, borderColor: colors.error }]}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Ionicons name="log-out-outline" size={22} color={colors.error} />
                    <Text style={[styles.menuText, { color: colors.error }]}>Keluar</Text>
                </TouchableOpacity>
            </View>

            <LogoutModal
                visible={logoutModalVisible}
                onClose={() => setLogoutModalVisible(false)}
                onConfirm={handleLogout}
            />

            <SettingsModal
                visible={settingsModalVisible}
                onClose={() => setSettingsModalVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        borderBottomWidth: 1,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
    },
    menuContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
    },
    menuText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 20,
    },
    logoutText: {
        color: Colors.light.error,
    },
});
