import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface Recipe {
    id: string;
    title: string;
    image: string;
    time: string;
    difficulty: string;
    category: string;
}

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/recipe/${recipe.id}`} asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                <Image source={{ uri: recipe.image }} style={styles.image} />
                <View style={styles.content}>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{recipe.category}</Text>
                        </View>
                    </View>

                    <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>

                    <View style={styles.footer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="time-outline" size={16} color={Colors.light.gray} />
                            <Text style={styles.infoText}>{recipe.time}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="bar-chart-outline" size={16} color={Colors.light.gray} />
                            <Text style={styles.infoText}>{recipe.difficulty}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.card,
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
                shadowColor: 'rgba(0,0,0,0.1)' // Android 9+
            },
        }),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200, // Matched web 200px
        resizeMode: 'cover',
    },
    content: {
        padding: 16, // 1rem approx
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    badge: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 12,
        color: Colors.light.gray,
        fontWeight: '500',
    },
});
