import './globals.css'

export const metadata = {
  title: 'Recipe Finder | Discover Delicious Recipes',
  description: 'Find recipes tailored to your dietary needs and preferences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
