import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import VideoPlayer from '../../components/VideoPlayer';
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

type TabType = 'ingredients' | 'instructions' | 'video';

const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
        case 'Mudah':
            return { borderColor: '#10b981', color: '#059669', bg: '#ecfdf5' };
        case 'Sedang':
            return { borderColor: '#f59e0b', color: '#d97706', bg: '#fffbeb' };
        case 'Sulit':
            return { borderColor: '#ef4444', color: '#dc2626', bg: '#fef2f2' };
        default:
            return { borderColor: Colors.light.border, color: Colors.light.gray, bg: Colors.light.card };
    }
};

export default function RecipeDetailScreen() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('ingredients');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                const recipeData = response.data.data || response.data;
                setRecipe(recipeData);
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
                <Text style={styles.notFoundText}>Resep tidak ditemukan</Text>
            </View>
        );
    }

    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = recipe.videoUrl ? getVideoId(recipe.videoUrl) : null;
    const diffStyle = getDifficultyStyle(recipe.difficulty);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: recipe.image }} style={styles.image} />
            </View>

            <View style={styles.content}>
                <View style={styles.badges}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
                    </View>
                    <View style={[styles.difficultyBadge, { borderColor: diffStyle.borderColor, backgroundColor: diffStyle.bg }]}>
                        <Text style={[styles.difficultyBadgeText, { color: diffStyle.color }]}>{recipe.difficulty}</Text>
                    </View>
                </View>

                <Text style={styles.title}>{recipe.title}</Text>

                <Text style={styles.description}>{recipe.description}</Text>

                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={16} color={Colors.light.gray} />
                        <Text style={styles.metaText}>{recipe.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="people-outline" size={16} color={Colors.light.gray} />
                        <Text style={styles.metaText}>{recipe.servings}</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'ingredients' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('ingredients')}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, activeTab === 'ingredients' && styles.tabTextActive]}>
                            Bahan-bahan
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'instructions' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('instructions')}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, activeTab === 'instructions' && styles.tabTextActive]}>
                            Cara Membuat
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'video' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('video')}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, activeTab === 'video' && styles.tabTextActive]}>
                            Video Tutorial
                        </Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'ingredients' && (
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="restaurant" size={20} color={Colors.light.primary} />
                            <Text style={styles.sectionTitle}>Bahan-bahan</Text>
                        </View>
                        {(recipe.ingredients || []).map((ingredient, index) => (
                            <View key={index} style={styles.listItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.listText}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'instructions' && (
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="restaurant" size={20} color={Colors.light.primary} />
                            <Text style={styles.sectionTitle}>Langkah-langkah</Text>
                        </View>
                        {(recipe.steps || []).map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'video' && (
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="play-circle" size={20} color={Colors.light.primary} />
                            <Text style={styles.sectionTitle}>Video Tutorial</Text>
                        </View>
                        {videoId ? (
                            <VideoPlayer videoId={videoId} />
                        ) : (
                            <Text style={styles.videoPlaceholder}>
                                Video tutorial belum tersedia untuk resep ini
                            </Text>
                        )}
                    </View>
                )}

                {recipe.tips && recipe.tips.length > 0 && (
                    <View style={styles.tipsCard}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="bulb" size={18} color={Colors.light.primary} />
                            <Text style={styles.tipsTitle}>Tips & Trik</Text>
                        </View>
                        {recipe.tips.map((tip, index) => (
                            <View key={index} style={styles.tipItem}>
                                <View style={styles.tipBullet} />
                                <Text style={styles.tipText}>{tip}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.card,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    notFoundText: {
        color: Colors.light.gray,
        fontSize: 16,
    },

    imageContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        paddingTop: 16,
    },
    image: {
        width: '85%',
        maxWidth: 500,
        height: 280,
        borderRadius: 16,
    },

    content: {
        padding: 20,
        marginTop: -16,
        backgroundColor: '#fef3ee',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    badges: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    categoryBadgeText: {
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
    difficultyBadgeText: {
        fontSize: 12,
        fontWeight: '500',
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: Colors.light.gray,
        lineHeight: 24,
        marginBottom: 16,
    },

    metaContainer: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 20,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: Colors.light.gray,
        fontSize: 14,
    },


    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 25,
        padding: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 25,
        alignItems: 'center',
    },
    tabButtonActive: {
        backgroundColor: Colors.light.card,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.light.gray,
    },
    tabTextActive: {
        color: Colors.light.text,
    },

    sectionCard: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.primary,
        marginRight: 12,
        marginTop: 7,
    },
    listText: {
        fontSize: 15,
        color: Colors.light.text,
        lineHeight: 22,
        flex: 1,
    },

    stepItem: {
        flexDirection: 'row',
        marginBottom: 16,
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
        fontSize: 13,
        fontWeight: '600',
    },
    stepText: {
        fontSize: 15,
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
        marginTop: 8,
    },
    webview: {
        flex: 1,
    },
    videoPlaceholder: {
        textAlign: 'center',
        color: Colors.light.gray,
        paddingVertical: 24,
        fontSize: 15,
    },

    tipsCard: {
        backgroundColor: '#fef7ed',
        borderRadius: 12,
        padding: 20,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#fed7aa',
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.primary,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    tipBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.primary,
        marginRight: 12,
        marginTop: 7,
    },
    tipText: {
        fontSize: 14,
        color: '#c2410c',
        lineHeight: 22,
        flex: 1,
    },
});
