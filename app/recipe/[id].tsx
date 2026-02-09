import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import Colors from '../../constants/Colors';

interface Recipe {
    id: string;
    title: string;
    image: string;
    time: string;
    difficulty: string;
    category: string;
    description: string;
    ingredients: string[];
    steps: string[];
    videoUrl?: string;
    tips?: string[];
    servings: string;
}

export default function RecipeDetailScreen() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={styles.center}>
                <Text>Resep tidak ditemukan</Text>
            </View>
        );
    }

    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = recipe.videoUrl ? getVideoId(recipe.videoUrl) : null;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image source={{ uri: recipe.image }} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{recipe.category}</Text>
                    </View>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={16} color={Colors.light.gray} />
                            <Text style={styles.meta}>{recipe.time}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="bar-chart-outline" size={16} color={Colors.light.gray} />
                            <Text style={styles.meta}>{recipe.difficulty}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="people-outline" size={16} color={Colors.light.gray} />
                            <Text style={styles.meta}>{recipe.servings}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.description}>{recipe.description}</Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Bahan-bahan</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.listText}>{ingredient}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Cara Membuat</Text>
                    {recipe.steps.map((step, index) => (
                        <View key={index} style={styles.stepItem}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>

                {videoId && (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Video Tutorial</Text>
                        <View style={styles.videoContainer}>
                            <WebView
                                style={styles.webview}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                                allowsFullscreenVideo
                            />
                        </View>
                    </View>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 20,
        marginTop: -20,
        backgroundColor: Colors.light.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 0,
            },
        }),
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    badge: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    metaContainer: {
        flexDirection: 'row',
        gap: 16,
        backgroundColor: Colors.light.card,
        padding: 12,
        borderRadius: 12,
        width: '100%',
        justifyContent: 'space-around',
    },
    metaItem: {
        alignItems: 'center',
        gap: 4,
    },
    meta: {
        color: Colors.light.gray,
        fontSize: 14,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        color: Colors.light.gray,
        lineHeight: 26,
        marginBottom: 24,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: Colors.light.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.light.text,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.primary,
        marginRight: 12,
    },
    listText: {
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 24,
        flex: 1,
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 24,
        flex: 1,
    },
    videoContainer: {
        height: 220,
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 12,
        overflow: 'hidden',
    },
    webview: {
        flex: 1,
    },
});
