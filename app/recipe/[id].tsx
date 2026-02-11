import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from '../../components/VideoPlayer';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import api from '../../services/api';

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
            return { borderColor: '#e5e7eb', color: '#6b7280', bg: '#ffffff' };
    }
};

export default function RecipeDetailScreen() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('ingredients');
    const [imageError, setImageError] = useState(false);

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
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={[styles.notFoundText, { color: colors.gray }]}>Resep tidak ditemukan</Text>
            </View>
        );
    }

    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = recipe.videoUrl ? getVideoId(recipe.videoUrl) : null;
    const diffStyle = getDifficultyStyle(recipe.difficulty);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.card }]} showsVerticalScrollIndicator={false}>
            <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
                {recipe.image && !imageError ? (
                    <Image
                        source={{ uri: recipe.image }}
                        style={styles.image}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: colors.border, borderColor: colors.border }]}>
                        <Ionicons name="image-outline" size={48} color={colors.gray} />
                        <Text style={[styles.imagePlaceholderText, { color: colors.gray }]}>Foto tidak tersedia</Text>
                    </View>
                )}
            </View>

            <View style={[styles.content, { backgroundColor: colorScheme === 'dark' ? colors.card : '#fef3ee' }]}>
                <View style={styles.badges}>
                    <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                        <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
                    </View>
                    <View style={[styles.difficultyBadge, { borderColor: diffStyle.borderColor, backgroundColor: diffStyle.bg }]}>
                        <Text style={[styles.difficultyBadgeText, { color: diffStyle.color }]}>{recipe.difficulty}</Text>
                    </View>
                </View>

                <Text style={[styles.title, { color: colors.text }]}>{recipe.title}</Text>

                <Text style={[styles.description, { color: colors.gray }]}>{recipe.description}</Text>

                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={16} color={colors.gray} />
                        <Text style={[styles.metaText, { color: colors.gray }]}>{recipe.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="people-outline" size={16} color={colors.gray} />
                        <Text style={[styles.metaText, { color: colors.gray }]}>{recipe.servings}</Text>
                    </View>
                </View>

                <View style={[styles.tabContainer, { backgroundColor: colorScheme === 'dark' ? colors.background : '#f3f4f6', borderColor: colors.border }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollView}>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'ingredients' && [styles.tabButtonActive, { backgroundColor: colors.card, borderColor: colors.border }]]}
                            onPress={() => setActiveTab('ingredients')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, { color: colors.gray }, activeTab === 'ingredients' && { color: colors.text }]}>
                                Bahan-bahan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'instructions' && [styles.tabButtonActive, { backgroundColor: colors.card, borderColor: colors.border }]]}
                            onPress={() => setActiveTab('instructions')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, { color: colors.gray }, activeTab === 'instructions' && { color: colors.text }]}>
                                Cara Membuat
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'video' && [styles.tabButtonActive, { backgroundColor: colors.card, borderColor: colors.border }]]}
                            onPress={() => setActiveTab('video')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, { color: colors.gray }, activeTab === 'video' && { color: colors.text }]}>
                                Video Tutorial
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {activeTab === 'ingredients' && (
                    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="restaurant" size={20} color={colors.primary} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Bahan-bahan</Text>
                        </View>
                        {(recipe.ingredients || []).map((ingredient, index) => (
                            <View key={index} style={styles.listItem}>
                                <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.listText, { color: colors.text }]}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'instructions' && (
                    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="restaurant" size={20} color={colors.primary} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Langkah-langkah</Text>
                        </View>
                        {(recipe.steps || []).map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'video' && (
                    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="play-circle" size={20} color={colors.primary} />
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Video Tutorial</Text>
                        </View>
                        {videoId ? (
                            <VideoPlayer videoId={videoId} />
                        ) : (
                            <View style={[styles.videoPlaceholderContainer, { backgroundColor: colorScheme === 'dark' ? colors.background : '#f9fafb', borderColor: colors.border }]}>
                                <Ionicons name="videocam-off-outline" size={48} color={colors.gray} />
                                <Text style={[styles.videoPlaceholderTitle, { color: colors.text }]}>Video Tidak Tersedia</Text>
                                <Text style={[styles.videoPlaceholderText, { color: colors.gray }]}>
                                    Video tutorial belum tersedia untuk resep ini
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {recipe.tips && recipe.tips.length > 0 && (
                    <View style={[styles.tipsCard, { backgroundColor: colorScheme === 'dark' ? '#3b2a1a' : '#fef7ed', borderColor: colorScheme === 'dark' ? '#7c5a30' : '#fed7aa' }]}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="bulb" size={18} color={colors.primary} />
                            <Text style={[styles.tipsTitle, { color: colors.primary }]}>Tips & Trik</Text>
                        </View>
                        {recipe.tips.map((tip, index) => (
                            <View key={index} style={styles.tipItem}>
                                <View style={[styles.tipBullet, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.tipText, { color: colorScheme === 'dark' ? '#fdba74' : '#c2410c' }]}>{tip}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 16,
    },

    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
    },
    image: {
        width: '85%',
        maxWidth: 500,
        height: 280,
        borderRadius: 16,
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    imagePlaceholderText: {
        fontSize: 14,
        marginTop: 8,
    },

    content: {
        padding: 20,
        marginTop: -16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    badges: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    categoryBadge: {
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
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
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
        fontSize: 14,
    },

    tabContainer: {
        borderRadius: 25,
        padding: 4,
        marginBottom: 16,
        borderWidth: 1,
    },
    tabScrollView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tabButtonActive: {
        borderWidth: 1,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '500',
    },

    sectionCard: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
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
        marginRight: 12,
        marginTop: 7,
    },
    listText: {
        fontSize: 15,
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
        lineHeight: 24,
        flex: 1,
    },

    videoPlaceholderContainer: {
        alignItems: 'center',
        paddingVertical: 32,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    videoPlaceholderTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
    },
    videoPlaceholderText: {
        textAlign: 'center',
        fontSize: 13,
        marginTop: 4,
    },

    tipsCard: {
        borderRadius: 12,
        padding: 20,
        marginTop: 12,
        borderWidth: 1,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
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
        marginRight: 12,
        marginTop: 7,
    },
    tipText: {
        fontSize: 14,
        lineHeight: 22,
        flex: 1,
    },
});
