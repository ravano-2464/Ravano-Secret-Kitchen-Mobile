import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface Recipe {
    id: string;
    title: string;
    image: string;
    time: string;
    difficulty: string;
    category: string;
    description?: string;
    servings?: string;
}

interface RecipeCardProps {
    recipe: Recipe;
}

const getDifficultyStyle = (difficulty: string, colorScheme: 'light' | 'dark') => {
    const colors = Colors[colorScheme];
    switch (difficulty) {
        case 'Mudah':
            return {
                borderColor: '#10b981',
                color: colorScheme === 'dark' ? '#34d399' : '#059669',
                bg: colorScheme === 'dark' ? '#064e3b' : '#ecfdf5',
            };
        case 'Sedang':
            return {
                borderColor: '#f59e0b',
                color: colorScheme === 'dark' ? '#fbbf24' : '#d97706',
                bg: colorScheme === 'dark' ? '#78350f' : '#fffbeb',
            };
        case 'Sulit':
            return {
                borderColor: '#ef4444',
                color: colorScheme === 'dark' ? '#f87171' : '#dc2626',
                bg: colorScheme === 'dark' ? '#7f1d1d' : '#fef2f2',
            };
        default:
            return { borderColor: colors.border, color: colors.gray, bg: colors.card };
    }
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const diffStyle = getDifficultyStyle(recipe.difficulty, colorScheme);
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/recipe/${recipe.id}`} asChild>
            <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} activeOpacity={0.9}>
                {recipe.image && !imageError ? (
                    <Image
                        source={{ uri: recipe.image }}
                        style={styles.image}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: colors.border }]}>
                        <Ionicons name="image-outline" size={40} color={colors.gray} />
                        <Text style={[styles.imagePlaceholderText, { color: colors.gray }]}>Foto tidak tersedia</Text>
                    </View>
                )}
                <View style={styles.content}>
                    <View style={styles.badgeContainer}>
                        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                            <Text style={styles.badgeText}>{recipe.category}</Text>
                        </View>
                        <View style={[styles.difficultyBadge, { borderColor: diffStyle.borderColor, backgroundColor: diffStyle.bg }]}>
                            <Text style={[styles.difficultyText, { color: diffStyle.color }]}>{recipe.difficulty}</Text>
                        </View>
                    </View>

                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{recipe.title}</Text>

                    {recipe.description ? (
                        <Text style={[styles.description, { color: colors.gray }]} numberOfLines={2}>{recipe.description}</Text>
                    ) : null}

                    <View style={styles.footer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="time-outline" size={14} color={colors.gray} />
                            <Text style={[styles.infoText, { color: colors.gray }]}>{recipe.time}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="people-outline" size={14} color={colors.gray} />
                            <Text style={[styles.infoText, { color: colors.gray }]}>{recipe.servings || '-'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 20,
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
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontSize: 13,
        marginTop: 6,
    },
    content: {
        padding: 16,
    },
    badgeContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },
    difficultyText: {
        fontSize: 12,
        fontWeight: '500',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 6,
        lineHeight: 22,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500',
    },
});
