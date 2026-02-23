'use client';

import { motion } from 'framer-motion';
import { DIETARY_OPTIONS, INTOLERANCE_OPTIONS } from '@/lib/spoonacular';
import { Filter, X } from 'lucide-react';

export default function FilterPanel({ 
  selectedDiet, 
  setSelectedDiet, 
  selectedIntolerances, 
  setSelectedIntolerances,
  isOpen,
  setIsOpen
}) {
  const toggleIntolerance = (value) => {
    if (selectedIntolerances.includes(value)) {
      setSelectedIntolerances(selectedIntolerances.filter(i => i !== value));
    } else {
      setSelectedIntolerances([...selectedIntolerances, value]);
    }
  };

  const clearFilters = () => {
    setSelectedDiet('');
    setSelectedIntolerances([]);
  };

  const hasActiveFilters = selectedDiet || selectedIntolerances.length > 0;

  return (
    <div className="w-full max-w-2xl">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors duration-200 mb-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700 font-medium">
            {selectedIntolerances.length + (selectedDiet ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      {isOpen && (
        <motion.div
          className="card-modern p-6 mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filter Recipes</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Diet Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Dietary Preference
            </label>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {DIETARY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Intolerances */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Exclude Allergens / Intolerances
            </label>
            <div className="flex flex-wrap gap-2">
              {INTOLERANCE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleIntolerance(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedIntolerances.includes(option.value)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {option.label}
                  {selectedIntolerances.includes(option.value) && (
                    <X className="inline w-3 h-3 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
