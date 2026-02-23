'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Heart, ExternalLink, Loader } from 'lucide-react';
import Image from 'next/image';
import { getRecipeDetails } from '@/lib/spoonacular';

export default function RecipeModal({ recipe, onClose, onFavoriteClick, isFavorite }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setIsLoading(true);
      try {
        const data = await getRecipeDetails(recipe.id);
        setDetails(data);
      } catch (error) {
        console.error('Error loading recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDetails();
  }, [recipe.id]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl-modern max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with image */}
          <div className="relative h-64 w-full bg-neutral-100">
            {recipe.image && (
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => onFavoriteClick(recipe)}
              className={`absolute top-4 right-16 p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/90 hover:bg-primary-600 hover:text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
            
            <div className="flex items-center space-x-6 mb-6 text-neutral-600">
              {recipe.readyInMinutes && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary-600" />
              </div>
            ) : details ? (
              <>
                {/* Summary */}
                {details.summary && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Overview</h3>
                    <div 
                      className="text-neutral-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: details.summary }}
                    />
                  </div>
                )}

                {/* Ingredients */}
                {details.extendedIngredients && details.extendedIngredients.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                    <ul className="space-y-2">
                      {details.extendedIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-neutral-700">{ingredient.original}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions */}
                {details.instructions && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                    <div 
                      className="text-neutral-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: details.instructions }}
                    />
                  </div>
                )}

                {/* Nutrition (if available) */}
                {details.nutrition && details.nutrition.nutrients && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Nutrition (per serving)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {details.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                        <div key={index} className="bg-neutral-50 rounded-lg p-3">
                          <div className="text-sm text-neutral-600">{nutrient.name}</div>
                          <div className="text-lg font-semibold text-neutral-900">
                            {Math.round(nutrient.amount)}{nutrient.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Source link */}
                {details.sourceUrl && (
                  <a
                    href={details.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span>View original recipe</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </>
            ) : (
              <div className="py-8 text-center text-neutral-500">
                Failed to load recipe details
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
