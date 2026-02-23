'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Heart } from 'lucide-react';
import Image from 'next/image';

export default function RecipeCard({ recipe, onCardClick, onFavoriteClick, isFavorite }) {
  return (
    <motion.div
      className="card-modern overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => onCardClick(recipe)}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
            <span className="text-neutral-400 text-4xl">🍽️</span>
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(recipe);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite
              ? 'bg-primary-600 text-white'
              : 'bg-white/90 text-neutral-600 hover:bg-primary-600 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {recipe.title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-neutral-600">
          {recipe.readyInMinutes && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
