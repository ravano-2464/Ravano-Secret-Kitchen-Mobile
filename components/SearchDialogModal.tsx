import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import api from '../services/api';
import { Recipe } from '../types/Recipe';
import { useColorScheme } from '../hooks/useColorScheme';

interface SearchDialogModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SearchDialogModal({ visible, onClose }: SearchDialogModalProps) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loadingRecipes, setLoadingRecipes] = useState(false);

    useEffect(() => {
        if (visible && recipes.length === 0) {
            fetchRecipes();
        }
    }, [visible]);

    const fetchRecipes = async () => {
        setLoadingRecipes(true);
        try {
            const response = await api.get('/recipes');
            setRecipes(response.data.data);
        } catch (error) {
            console.error('Error fetching recipes for suggestions:', error);
        } finally {
            setLoadingRecipes(false);
        }
    };

    const filteredRecipes = recipes.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRecipePress = (recipeId: string) => {
        onClose();
        router.push(`/recipe/${recipeId}`);
    };

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <TouchableOpacity
            style={[styles.recipeItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => handleRecipePress(item.id)}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
                <Text style={[styles.recipeCategory, { color: colors.primary }]}>{item.category}</Text>
                <Text style={[styles.recipeTitle, { color: colors.text }]}>{item.title}</Text>
                <View style={styles.recipeMeta}>
                    <Ionicons name="time-outline" size={14} color={colors.gray} />
                    <Text style={[styles.metaText, { color: colors.gray }]}>{item.time}</Text>
                    <Ionicons name="people-outline" size={14} color={colors.gray} style={{ marginLeft: 8 }} />
                    <Text style={[styles.metaText, { color: colors.gray }]}>{item.servings}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
                <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View style={[styles.searchInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Ionicons name="search" size={20} color={colors.gray} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder="Cari resep..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                            placeholderTextColor={colors.gray}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={18} color={colors.gray} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {loadingRecipes ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredRecipes}
                        keyExtractor={(item) => item.id}
                        renderItem={renderRecipeItem}
                        contentContainerStyle={styles.listContent}
                        keyboardShouldPersistTaps="handled"
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={[styles.emptyText, { color: colors.gray }]}>
                                    {searchQuery ? 'Tidak ada resep ditemukan' : 'Belum ada resep'}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    listContent: {
        padding: 16,
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
    },
    recipeImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    recipeInfo: {
        flex: 1,
        marginLeft: 12,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    recipeCategory: {
        fontSize: 12,
        marginBottom: 2,
    },
    recipeMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        fontSize: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
    },
});
