import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { ThemePreference, useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

const themeOptions: { value: ThemePreference; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'system', label: 'Sistem', icon: 'phone-portrait-outline' },
    { value: 'light', label: 'Terang', icon: 'sunny-outline' },
    { value: 'dark', label: 'Gelap', icon: 'moon-outline' },
];

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
    const { themePreference, setThemePreference, colorScheme } = useTheme();
    const colors = Colors[colorScheme];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <Pressable onPress={() => {}} style={[styles.modalContent, { backgroundColor: colors.card }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Pengaturan</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={colors.gray} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.gray }]}>Tema Tampilan</Text>

                    <View style={styles.optionsContainer}>
                        {themeOptions.map((option) => {
                            const isSelected = themePreference === option.value;
                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.optionItem,
                                        { borderColor: isSelected ? colors.primary : colors.border },
                                        isSelected && { backgroundColor: colors.primary + '15' },
                                    ]}
                                    onPress={() => setThemePreference(option.value)}
                                >
                                    <Ionicons
                                        name={option.icon}
                                        size={24}
                                        color={isSelected ? colors.primary : colors.gray}
                                    />
                                    <Text
                                        style={[
                                            styles.optionLabel,
                                            { color: isSelected ? colors.primary : colors.text },
                                            isSelected && { fontWeight: '700' },
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {isSelected && (
                                        <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: colors.primary }]}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Selesai</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    optionsContainer: {
        gap: 10,
        marginBottom: 20,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        gap: 12,
    },
    optionLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    closeButton: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});