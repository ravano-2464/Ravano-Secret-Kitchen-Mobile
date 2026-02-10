import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import Colors from '../../constants/Colors';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

            router.replace('/(tabs)');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="restaurant" size={28} color="#fff" />
                        </View>

                        <Text style={styles.title}>Selamat Datang</Text>
                        <Text style={styles.subtitle}>Login untuk melanjutkan ke Rahasia Dapur</Text>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ibu.siti@email.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor={Colors.light.gray}
                            />

                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor={Colors.light.gray}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
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
                            <Text style={styles.footerText}>Belum punya akun? </Text>
                            <Link href="/(auth)/register" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>Daftar di sini</Text>
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
        backgroundColor: Colors.light.background,
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
        backgroundColor: Colors.light.card,
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
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.gray,
        marginBottom: 24,
        textAlign: 'center',
    },
    errorContainer: {
        backgroundColor: '#fef2f2',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        marginBottom: 12,
    },
    errorText: {
        color: '#dc2626',
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
        color: Colors.light.text,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: Colors.light.card,
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        borderWidth: 1,
        borderColor: Colors.light.border,
        color: Colors.light.text,
    },
    button: {
        backgroundColor: Colors.light.primary,
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
        color: Colors.light.gray,
        fontSize: 14,
    },
    linkText: {
        color: Colors.light.primary,
        fontWeight: '500',
        fontSize: 14,
    },
});
