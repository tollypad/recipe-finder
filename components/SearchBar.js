'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes, ingredients, or cuisines..."
          className="w-full px-6 py-4 pl-14 text-lg rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all duration-200"
          disabled={isLoading}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        {query && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </motion.button>
          </div>
        )}
      </div>
    </motion.form>
  );
}
