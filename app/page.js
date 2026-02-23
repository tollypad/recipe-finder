'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, AlertCircle, ChefHat, Heart, Info } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import { searchRecipes, getRandomRecipes } from '@/lib/spoonacular';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

export default function Home() {
  const [activeSection, setActiveSection] = useState('search');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filter states
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Load random recipes on initial load
  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const loadRandomRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getRandomRecipes(9);
      setRecipes(results);
    } catch (err) {
      setError('Failed to load recipes. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await searchRecipes({
        query,
        diet: selectedDiet,
        intolerances: selectedIntolerances,
        number: 12,
      });
      setRecipes(results);
      
      if (results.length === 0) {
        setError('No recipes found. Try different search terms or filters.');
      }
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = (recipe) => {
    const { favorites: newFavorites } = toggleFavorite(recipe);
    setFavorites(newFavorites);
  };

  const isFavoriteRecipe = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  return (
    <div className="min-h-screen">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Search Section */}
          {activeSection === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4"
                >
                  <ChefHat className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Discover Delicious Recipes</h1>
                <p className="text-neutral-600 text-lg">
                  Search recipes tailored to your dietary needs and preferences
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col items-center mb-6">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              </div>

              {/* Filter Panel */}
              <div className="flex justify-center mb-8">
                <FilterPanel
                  selectedDiet={selectedDiet}
                  setSelectedDiet={setSelectedDiet}
                  selectedIntolerances={selectedIntolerances}
                  setSelectedIntolerances={setSelectedIntolerances}
                  isOpen={isFilterOpen}
                  setIsOpen={setIsFilterOpen}
                />
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader className="w-12 h-12 animate-spin text-primary-600 mb-4" />
                  <p className="text-neutral-600">Finding recipes...</p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <motion.div
                  className="card-modern p-6 max-w-md mx-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-neutral-700">{error}</p>
                  {error.includes('API key') && (
                    <p className="text-sm text-neutral-500 mt-2">
                      Make sure you have added your Spoonacular API key to .env.local
                    </p>
                  )}
                </motion.div>
              )}

              {/* Recipe Grid */}
              {!isLoading && !error && recipes.length > 0 && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      {hasSearched ? 'Search Results' : 'Popular Recipes'}
                    </h2>
                    <p className="text-neutral-600">
                      {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onCardClick={setSelectedRecipe}
                        onFavoriteClick={handleFavoriteToggle}
                        isFavorite={isFavoriteRecipe(recipe.id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Favorites Section */}
          {activeSection === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4"
                >
                  <Heart className="w-12 h-12 text-white fill-current" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Your Favorites</h1>
                <p className="text-neutral-600 text-lg">
                  {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>

              {favorites.length === 0 ? (
                <motion.div
                  className="card-modern p-12 max-w-md mx-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Heart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-neutral-600 mb-4">
                    Start exploring recipes and save your favorites!
                  </p>
                  <button
                    onClick={() => setActiveSection('search')}
                    className="btn-primary"
                  >
                    Browse Recipes
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onCardClick={setSelectedRecipe}
                      onFavoriteClick={handleFavoriteToggle}
                      isFavorite={true}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4"
                >
                  <Info className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">About Recipe Finder</h1>
                <p className="text-neutral-600 text-lg">
                  Your smart cooking companion
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <motion.div
                  className="card-modern p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-semibold mb-3">Features</h2>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                      Search thousands of recipes by ingredients, name, or cuisine
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                      Filter by dietary preferences (vegetarian, vegan, keto, paleo, etc.)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                      Exclude allergens and intolerances (gluten, dairy, nuts, etc.)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                      View detailed instructions, ingredients, and nutrition info
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                      Save your favorite recipes for quick access
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="card-modern p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-3">Technology</h2>
                  <p className="text-neutral-700 mb-3">
                    Built with modern web technologies for a fast and responsive experience:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Spoonacular API'].map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="card-modern p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
                  <p className="text-neutral-700">
                    To use this application, you'll need a free API key from{' '}
                    <a 
                      href="https://spoonacular.com/food-api" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Spoonacular
                    </a>
                    . The free tier includes 150 requests per day, which is perfect for personal use.
                    Add your API key to the <code className="px-2 py-0.5 rounded bg-neutral-100 text-sm font-mono">.env.local</code> file
                    and start discovering amazing recipes!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onFavoriteClick={handleFavoriteToggle}
          isFavorite={isFavoriteRecipe(selectedRecipe.id)}
        />
      )}
    </div>
  );
}
