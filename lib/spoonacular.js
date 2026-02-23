// Spoonacular API helper functions
const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export async function searchRecipes({ query, diet, intolerances, number = 12 }) {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query: query || '',
      number: number.toString(),
      addRecipeInformation: 'true',
      fillIngredients: 'true',
    });

    if (diet) params.append('diet', diet);
    if (intolerances && intolerances.length > 0) {
      params.append('intolerances', intolerances.join(','));
    }

    const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

export async function getRecipeDetails(id) {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: 'true',
    });

    const response = await fetch(`${BASE_URL}/recipes/${id}/information?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

export async function getRandomRecipes(number = 9) {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: number.toString(),
    });

    const response = await fetch(`${BASE_URL}/recipes/random?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch random recipes');
    }

    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
}

// Available dietary options
export const DIETARY_OPTIONS = [
  { value: '', label: 'All Diets' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'ketogenic', label: 'Ketogenic' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'lacto-vegetarian', label: 'Lacto-Vegetarian' },
  { value: 'ovo-vegetarian', label: 'Ovo-Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescetarian', label: 'Pescetarian' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'primal', label: 'Primal' },
  { value: 'low-fodmap', label: 'Low FODMAP' },
  { value: 'whole30', label: 'Whole30' },
];

// Available intolerance options
export const INTOLERANCE_OPTIONS = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'egg', label: 'Egg' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'grain', label: 'Grain' },
  { value: 'peanut', label: 'Peanut' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'sesame', label: 'Sesame' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'soy', label: 'Soy' },
  { value: 'sulfite', label: 'Sulfite' },
  { value: 'tree-nut', label: 'Tree Nut' },
  { value: 'wheat', label: 'Wheat' },
];
