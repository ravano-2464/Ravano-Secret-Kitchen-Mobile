import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

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
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    return (
        <View style={{ zIndex: 10 }}>
            <View style={styles.heroSection}>
                <Text style={[styles.heroTitle, { color: colors.text }]}>Jelajahi Resep Masakan</Text>
                <Text style={[styles.heroSubtitle, { color: colors.gray }]}>
                    Temukan berbagai resep masakan Indonesia untuk keluarga dan usaha Anda
                </Text>

                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={onSearchPress ? 0.7 : 1}
                        onPress={onSearchPress}
                    >
                        <Ionicons name="search" size={18} color={colors.gray} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder="Cari resep..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={colors.gray}
                            editable={!onSearchPress}
                        />
                    </TouchableOpacity>

                    {!onSearchPress && suggestions.length > 0 && (
                        <View style={[styles.suggestionsContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item, index) => index.toString()}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.suggestionItem, { borderBottomColor: colors.border }]}
                                        onPress={() => onSuggestionPress?.(item)}
                                    >
                                        <Ionicons name="search-outline" size={16} color={colors.gray} style={{ marginRight: 8 }} />
                                        <Text style={[styles.suggestionText, { color: colors.text }]}>{item}</Text>
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
                            { borderColor: colors.border, backgroundColor: colors.card },
                            activeCategory === category && { backgroundColor: colors.primary, borderColor: colors.primary },
                        ]}
                        onPress={() => setActiveCategory(category)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                { color: colors.gray },
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
        zIndex: 10,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
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
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        padding: 0,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 1,
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
    },
    suggestionText: {
        fontSize: 14,
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
        marginRight: 8,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#fff',
    },
});
