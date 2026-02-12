import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import Colors from '../../constants/Colors';
import Toast from 'react-native-toast-message';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function LoginScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Mohon isi email dan password');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            Toast.show({
                type: 'success',
                text1: 'Login Berhasil',
                text2: `Selamat datang kembali, ${user.name}`
            });

            router.replace('/(tabs)');
        } catch (err: any) {
            const msg = err.response?.data?.message || '';
            if (msg.toLowerCase().includes('invalid credentials') || msg.toLowerCase().includes('invalid password')) {
                setError('Password salah');
            } else if (msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('no user')) {
                setError('Email tidak ditemukan');
            } else {
                setError(msg || 'Terjadi kesalahan');
            }
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
                        <Image
                            source={require('../../public/logo/Ravano-Secret-Kitchen-Logo.webp')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={[styles.title, { color: colors.text }]}>Selamat Datang</Text>
                        <Text style={[styles.subtitle, { color: colors.gray }]}>Login untuk melanjutkan ke Ravano Secret Kitchen</Text>

                        {error ? (
                            <View style={[styles.errorContainer, { backgroundColor: colorScheme === 'dark' ? '#451a1a' : '#fef2f2' }]}>
                                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                                placeholder="Masukkan email"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor={colors.gray}
                            />

                            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                            <View style={[styles.passwordContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <TextInput
                                    style={[styles.passwordInput, { color: colors.text }]}
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor={colors.gray}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.gray} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.primary }, loading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.gray }]}>Belum punya akun? </Text>
                            <Link href="/(auth)/register" asChild>
                                <TouchableOpacity>
                                    <Text style={[styles.linkText, { color: colors.primary }]}>Daftar di sini</Text>
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
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        paddingHorizontal: 16,
        fontSize: 15,
    },
    eyeButton: {
        paddingHorizontal: 12,
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
