import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import Colors from '../../constants/Colors';
import Toast from 'react-native-toast-message';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function RegisterScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('Mohon lengkapi semua data');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        setError('');
        setLoading(true);
        try {
            await api.post('/auth/register', { name, email, password });

            Toast.show({
                type: 'success',
                text1: 'Registrasi Berhasil',
                text2: 'Silakan login dengan akun baru Anda'
            });

            router.push('/(auth)/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.card, { backgroundColor: colors.card }]}>
                        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
                            <Ionicons name="restaurant" size={28} color="#fff" />
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>Ravano Secret Kitchen</Text>
                        <Text style={[styles.subtitle, { color: colors.gray }]}>Daftar untuk mengakses ribuan resep masakan</Text>

                        {error ? (
                            <View style={[styles.errorContainer, { backgroundColor: colorScheme === 'dark' ? '#451a1a' : '#fef2f2' }]}>
                                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Nama Lengkap</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                                placeholder="Masukkan nama lengkap anda"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor={colors.gray}
                            />

                            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                                placeholder="Masukkan email anda"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor={colors.gray}
                            />

                            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                                placeholder="Minimal 6 karakter"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor={colors.gray}
                            />

                            <Text style={[styles.label, { color: colors.text }]}>Konfirmasi Password</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                                placeholder="Ulangi password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                placeholderTextColor={colors.gray}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.primary }, loading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Daftar</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.gray }]}>Sudah punya akun? </Text>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <Text style={[styles.linkText, { color: colors.primary }]}>Login di sini</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        borderRadius: 16,
        padding: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 4,
                shadowColor: 'rgba(0,0,0,0.1)',
            },
        }),
        alignItems: 'center',
    },
    logoContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
        textAlign: 'center',
    },
    errorContainer: {
        padding: 12,
        borderRadius: 8,
        width: '100%',
        marginBottom: 12,
    },
    errorText: {
        fontSize: 14,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        borderWidth: 1,
    },
    button: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 8,
        marginBottom: 24,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
    },
    linkText: {
        fontWeight: '500',
        fontSize: 14,
    },
});
