import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import RecipeCard from '../../components/RecipeCard';
import Colors from '../../constants/Colors';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
  category: string;
}

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecipes();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resep Terbaru</Text>
        <Text style={styles.headerSubtitle}>Temukan inspirasi memasak hari ini</Text>
      </View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.primary]} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada resep ditemukan</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.light.gray,
    marginTop: 4,
  },
  listContent: {
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: Colors.light.gray,
  },
});
