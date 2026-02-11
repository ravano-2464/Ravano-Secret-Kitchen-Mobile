import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import RecipeCard from '../../components/RecipeCard';
import SearchDialogModal from '../../components/SearchDialogModal';
import Colors from '../../constants/Colors';
import api from '../../services/api';
import { Recipe } from '../../types/Recipe';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function HomeScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [userName, setUserName] = useState('User');

    const [searchModalVisible, setSearchModalVisible] = useState(false);

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

    const categories = useMemo(() => {
        const cats = Array.from(new Set(recipes.map(r => r.category)));
        return ['Semua', ...cats];
    }, [recipes]);

    const filteredRecipes = useMemo(() => {
        let result = recipes;

        if (activeCategory !== 'Semua') {
            result = result.filter(recipe => recipe.category === activeCategory);
        }

        return result;
    }, [recipes, activeCategory]);

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

            <View style={[styles.navbar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <View style={styles.navbarBrand}>
                    <TouchableOpacity onPress={toggleDrawer} style={{ marginRight: 12 }}>
                        <Ionicons name="menu" size={28} color={colors.text} />
                    </TouchableOpacity>
                    <View style={[styles.navbarLogo, { backgroundColor: colors.primary }]}>
                        <Ionicons name="restaurant" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={[styles.navbarTitle, { color: colors.text }]}>Ravano Secret Kitchen</Text>
                        <Text style={[styles.navbarSubtitle, { color: colors.gray }]}>
                            Selamat datang, <Text style={[styles.navbarUserName, { color: colors.primary }]}>{userName}</Text>
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={filteredRecipes}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
                ListHeaderComponent={
                    <HomeHeader
                        searchQuery=""
                        setSearchQuery={() => { }}
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        onSearchPress={() => setSearchModalVisible(true)}
                    />
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                }
                ListEmptyComponent={
                    <View style={styles.noResults}>
                        <Text style={[styles.emptyText, { color: colors.gray }]}>Tidak ada resep yang ditemukan</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />

            <SearchDialogModal
                visible={searchModalVisible}
                onClose={() => setSearchModalVisible(false)}
            />
        </SafeAreaView>
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

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    navbarSubtitle: {
        fontSize: 12,
    },
    navbarUserName: {
        fontWeight: '600',
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
    },
});
