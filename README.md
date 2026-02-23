# Recipe Finder

A modern recipe search application with dietary filters and favorites. Find recipes tailored to your dietary needs and save your favorites for quick access.

## Features

- **Smart Search**: Search thousands of recipes by ingredients, name, or cuisine
- **Dietary Filters**: Filter by vegetarian, vegan, keto, paleo, gluten-free, and more
- **Allergen Control**: Exclude dairy, nuts, gluten, eggs, and other common allergens
- **Detailed Recipes**: View instructions, ingredients, nutrition info, and cooking times
- **Favorites**: Save recipes locally for quick access
- **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Spoonacular API** - Recipe data source
- **Lucide React** - Modern icons

## Getting Started

### 1. Get a Spoonacular API Key

Sign up for a free API key at [spoonacular.com/food-api](https://spoonacular.com/food-api)

The free tier includes:
- 150 requests per day
- Access to 5000+ recipes
- Full recipe information and nutrition data

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser.

## How to Use

### Search Recipes

1. Enter ingredients or recipe names in the search bar
2. Click **Filters** to set dietary preferences and exclude allergens
3. Click on any recipe card to view full details

### Save Favorites

- Click the heart icon on any recipe to save it
- Access saved recipes in the **Favorites** tab
- Favorites are stored locally in your browser

### Dietary Filters

Available diet options:
- Gluten Free
- Ketogenic
- Vegetarian / Vegan
- Paleo / Primal
- Pescetarian
- Low FODMAP
- Whole30

Available allergen exclusions:
- Dairy, Egg, Gluten, Grain
- Peanut, Tree Nut, Soy
- Seafood, Shellfish
- Sesame, Sulfite, Wheat

## Project Structure

```
recipe-finder/
├── app/
│   ├── page.js          # Main app with search, favorites, about sections
│   ├── layout.js        # Root layout
│   └── globals.css      # Global styles
├── components/
│   ├── Header.js        # Navigation tabs
│   ├── SearchBar.js     # Recipe search input
│   ├── FilterPanel.js   # Diet and allergen filters
│   ├── RecipeCard.js    # Recipe preview card
│   └── RecipeModal.js   # Full recipe details modal
├── lib/
│   ├── spoonacular.js   # API helper functions
│   └── favorites.js     # localStorage management
└── README.md
```

## API Usage

This app uses the Spoonacular API with the following endpoints:

- `/recipes/complexSearch` - Search with filters
- `/recipes/{id}/information` - Get recipe details
- `/recipes/random` - Get random recipes

Free tier allows 150 requests/day, which is enough for normal usage.

## Customization

### Change Port

Edit `package.json`:

```json
"scripts": {
  "dev": "next dev -p YOUR_PORT"
}
```

### Update Color Theme

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ }
}
```

## License

MIT - Feel free to use this project for your portfolio or personal use.
