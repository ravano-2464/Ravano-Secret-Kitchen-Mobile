import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import Colors from '../../constants/Colors';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Mohon lengkapi semua data');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', { name, email, password });
            Alert.alert('Sukses', 'Registrasi berhasil, silakan login', [
                { text: 'OK', onPress: () => router.push('/(auth)/login') }
            ]);
        } catch (error: any) {
            Alert.alert('Registrasi Gagal', error.response?.data?.message || 'Terjadi kesalahan');
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
                            <Text style={styles.logoText}>RD</Text>
                        </View>
                        <Text style={styles.title}>Buat Akun</Text>
                        <Text style={styles.subtitle}>Daftar untuk mulai memasak</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nama Lengkap</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nama Anda"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor={Colors.light.gray}
                            />

                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email@contoh.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor={Colors.light.gray}
                            />

                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor={Colors.light.gray}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
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
                            <Text style={styles.footerText}>Sudah punya akun? </Text>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>Masuk</Text>
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
                shadowColor: 'rgba(0,0,0,0.1)'
            },
        }),
        alignItems: 'center',
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.gray,
        marginBottom: 32,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        color: Colors.light.text,
    },
    button: {
        backgroundColor: Colors.light.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
        fontWeight: '600',
        fontSize: 14,
    },
});
