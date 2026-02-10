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

export default function HomeScreen() {
    const navigation = useNavigation();
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
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.light.card} />

            <View style={styles.navbar}>
                <View style={styles.navbarBrand}>
                    <TouchableOpacity onPress={toggleDrawer} style={{ marginRight: 12 }}>
                        <Ionicons name="menu" size={28} color={Colors.light.text} />
                    </TouchableOpacity>
                    <View style={styles.navbarLogo}>
                        <Ionicons name="restaurant" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.navbarTitle}>Ravano Secret Kitchen</Text>
                        <Text style={styles.navbarSubtitle}>
                            Selamat datang, <Text style={styles.navbarUserName}>{userName}</Text>
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
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.primary]} />
                }
                ListEmptyComponent={
                    <View style={styles.noResults}>
                        <Text style={styles.emptyText}>Tidak ada resep yang ditemukan</Text>
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
        backgroundColor: Colors.light.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },

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
