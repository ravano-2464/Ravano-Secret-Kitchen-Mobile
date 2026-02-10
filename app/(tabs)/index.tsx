import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import RecipeCard from '../../components/RecipeCard';
import Colors from '../../constants/Colors';
import { Recipe } from '../../types/Recipe';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [userName, setUserName] = useState('User');

    const fetchRecipes = async () => {
        try {
            const response = await api.get('/recipes');
            setRecipes(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const loadUser = async () => {
        try {
            const userStr = await AsyncStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                setUserName(user.name || 'User');
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchRecipes();
        loadUser();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecipes();
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        Toast.show({
            type: 'success',
            text1: 'Logout Berhasil',
            text2: 'Sampai jumpa lagi!'
        });
        router.replace('/(auth)/login');
    };

    const categories = useMemo(() => {
        const cats = Array.from(new Set(recipes.map(r => r.category)));
        return ['Semua', ...cats];
    }, [recipes]);

    const filteredRecipes = useMemo(() => {
        let result = recipes;

        if (activeCategory !== 'Semua') {
            result = result.filter(recipe => recipe.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(recipe =>
                recipe.title.toLowerCase().includes(query) ||
                recipe.description?.toLowerCase().includes(query)
            );
        }

        return result;
    }, [recipes, activeCategory, searchQuery]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    const renderHeader = () => (
        <View>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Jelajahi Resep Masakan</Text>
                <Text style={styles.heroSubtitle}>
                    Temukan berbagai resep masakan Indonesia untuk keluarga dan usaha Anda
                </Text>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color={Colors.light.gray} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari resep..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.light.gray}
                    />
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
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

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.light.card} />

            <View style={styles.navbar}>
                <View style={styles.navbarBrand}>
                    <View style={styles.navbarLogo}>
                        <Ionicons name="restaurant" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.navbarTitle}>Rahasia Dapur</Text>
                        <Text style={styles.navbarSubtitle}>
                            Selamat datang, <Text style={styles.navbarUserName}>{userName}</Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
                    <Ionicons name="log-out-outline" size={18} color={Colors.light.gray} />
                    <Text style={styles.logoutText}>Keluar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredRecipes}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.primary]} />
                }
                ListEmptyComponent={
                    <View style={styles.noResults}>
                        <Text style={styles.emptyText}>Tidak ada resep yang ditemukan</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
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

    // Navbar
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: Colors.light.card,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    navbarBrand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    navbarLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    navbarSubtitle: {
        fontSize: 12,
        color: Colors.light.gray,
    },
    navbarUserName: {
        color: Colors.light.primary,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    logoutText: {
        fontSize: 14,
        color: Colors.light.gray,
    },

    // Hero
    heroSection: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fef3ee',
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

    // Search Bar
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
        width: '100%',
        maxWidth: 400,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: Colors.light.text,
        padding: 0,
    },

    // Category Filter
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

    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    noResults: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.light.gray,
    },
});
