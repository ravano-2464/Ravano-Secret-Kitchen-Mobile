import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import api from '../services/api';
import { Recipe } from '../types/Recipe';

interface SearchDialogModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SearchDialogModal({ visible, onClose }: SearchDialogModalProps) {
    const router = useRouter();
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
            style={styles.recipeItem}
            onPress={() => handleRecipePress(item.id)}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
                <Text style={styles.recipeCategory}>{item.category}</Text>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <View style={styles.recipeMeta}>
                    <Ionicons name="time-outline" size={14} color={Colors.light.gray} />
                    <Text style={styles.metaText}>{item.time}</Text>
                    <Ionicons name="people-outline" size={14} color={Colors.light.gray} style={{ marginLeft: 8 }} />
                    <Text style={styles.metaText}>{item.servings}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.gray} />
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={20} color={Colors.light.gray} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Cari resep..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                            placeholderTextColor={Colors.light.gray}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={18} color={Colors.light.gray} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {loadingRecipes ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Colors.light.primary} />
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
                                <Text style={styles.emptyText}>
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
        backgroundColor: Colors.light.background,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: Colors.light.text,
    },
    listContent: {
        padding: 16,
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
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
        color: Colors.light.text,
        marginBottom: 4,
    },
    recipeCategory: {
        fontSize: 12,
        color: Colors.light.primary,
        marginBottom: 2,
    },
    recipeMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        fontSize: 12,
        color: Colors.light.gray,
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
        color: Colors.light.gray,
        fontSize: 14,
    },
});
