// Favorites management using localStorage

const FAVORITES_KEY = 'recipe-finder-favorites';

export function getFavorites() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}

export function saveFavorites(favorites) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}

export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === recipeId);
}

export function addFavorite(recipe) {
  const favorites = getFavorites();
  
  // Don't add if already favorited
  if (favorites.some(fav => fav.id === recipe.id)) {
    return favorites;
  }
  
  const newFavorites = [...favorites, {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    savedAt: new Date().toISOString(),
  }];
  
  saveFavorites(newFavorites);
  return newFavorites;
}

export function removeFavorite(recipeId) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(fav => fav.id !== recipeId);
  saveFavorites(newFavorites);
  return newFavorites;
}

export function toggleFavorite(recipe) {
  if (isFavorite(recipe.id)) {
    return { favorites: removeFavorite(recipe.id), added: false };
  } else {
    return { favorites: addFavorite(recipe), added: true };
  }
}
