import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

interface HomeHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    suggestions?: string[];
    onSuggestionPress?: (suggestion: string) => void;
    onSearchPress?: () => void;
}

export default function HomeHeader({
    searchQuery,
    setSearchQuery,
    categories,
    activeCategory,
    setActiveCategory,
    suggestions = [],
    onSuggestionPress,
    onSearchPress,
}: HomeHeaderProps) {
    return (
        <View style={{ zIndex: 10 }}>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Jelajahi Resep Masakan</Text>
                <Text style={styles.heroSubtitle}>
                    Temukan berbagai resep masakan Indonesia untuk keluarga dan usaha Anda
                </Text>

                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        style={styles.searchBar}
                        activeOpacity={onSearchPress ? 0.7 : 1}
                        onPress={onSearchPress}
                    >
                        <Ionicons name="search" size={18} color={Colors.light.gray} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Cari resep..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={Colors.light.gray}
                            editable={!onSearchPress}
                        />
                    </TouchableOpacity>

                    {!onSearchPress && suggestions.length > 0 && (
                        <View style={styles.suggestionsContainer}>
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item, index) => index.toString()}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.suggestionItem}
                                        onPress={() => onSuggestionPress?.(item)}
                                    >
                                        <Ionicons name="search-outline" size={16} color={Colors.light.gray} style={{ marginRight: 8 }} />
                                        <Text style={styles.suggestionText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
                style={{ zIndex: 1 }}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            activeCategory === category && styles.categoryButtonActive,
                        ]}
                        onPress={() => setActiveCategory(category)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                activeCategory === category && styles.categoryTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    heroSection: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fef3ee',
        zIndex: 10,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.light.gray,
        marginBottom: 16,
        textAlign: 'center',
        lineHeight: 20,
    },

    searchContainer: {
        width: '100%',
        maxWidth: 400,
        zIndex: 20,
        position: 'relative',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: Colors.light.text,
        padding: 0,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 1,
        borderColor: Colors.light.border,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 200,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    suggestionText: {
        fontSize: 14,
        color: Colors.light.text,
    },

    categoryContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.border,
        backgroundColor: Colors.light.card,
        marginRight: 8,
    },
    categoryButtonActive: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.gray,
    },
    categoryTextActive: {
        color: '#fff',
    },
});
