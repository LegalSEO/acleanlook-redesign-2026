export type ColorFamily =
  | 'whites'
  | 'grays'
  | 'blues'
  | 'greens'
  | 'warm'
  | 'bold'
  | 'neutrals'

export type ColorBrand =
  | 'benjamin-moore'
  | 'sherwin-williams'
  | 'chicago-favorites'
  | 'trending-2025'

export interface PaintColor {
  name: string
  hex: string
  brand: ColorBrand
  family: ColorFamily
  code?: string
}

export const COLOR_BRANDS: { value: ColorBrand; label: string }[] = [
  { value: 'benjamin-moore', label: 'Benjamin Moore' },
  { value: 'sherwin-williams', label: 'Sherwin-Williams' },
  { value: 'chicago-favorites', label: 'Chicago Favorites' },
  { value: 'trending-2025', label: 'Trending 2025' },
]

export const COLOR_FAMILIES: { value: ColorFamily; label: string }[] = [
  { value: 'whites', label: 'Whites' },
  { value: 'grays', label: 'Grays' },
  { value: 'neutrals', label: 'Neutrals' },
  { value: 'blues', label: 'Blues' },
  { value: 'greens', label: 'Greens' },
  { value: 'warm', label: 'Warm Tones' },
  { value: 'bold', label: 'Bold' },
]

export const PAINT_COLORS: PaintColor[] = [
  // ─── Benjamin Moore ─────────────────────────────────────────
  // Whites
  { name: 'Simply White', hex: '#F1EDE4', brand: 'benjamin-moore', family: 'whites', code: 'OC-117' },
  { name: 'White Dove', hex: '#F3EEE0', brand: 'benjamin-moore', family: 'whites', code: 'OC-17' },
  { name: 'Chantilly Lace', hex: '#F5F2EC', brand: 'benjamin-moore', family: 'whites', code: 'OC-65' },
  { name: 'Cloud White', hex: '#F0EBE0', brand: 'benjamin-moore', family: 'whites', code: 'OC-130' },
  { name: 'Decorator\'s White', hex: '#ECEAE5', brand: 'benjamin-moore', family: 'whites', code: 'OC-149' },
  // Grays
  { name: 'Revere Pewter', hex: '#C2B9A7', brand: 'benjamin-moore', family: 'grays', code: 'HC-172' },
  { name: 'Edgecomb Gray', hex: '#C8BDA8', brand: 'benjamin-moore', family: 'grays', code: 'HC-173' },
  { name: 'Stonington Gray', hex: '#B0AFA7', brand: 'benjamin-moore', family: 'grays', code: 'HC-170' },
  { name: 'Chelsea Gray', hex: '#8B8B83', brand: 'benjamin-moore', family: 'grays', code: 'HC-168' },
  { name: 'Kendall Charcoal', hex: '#5D5F5E', brand: 'benjamin-moore', family: 'grays', code: 'HC-166' },
  { name: 'Gray Owl', hex: '#C3C3B8', brand: 'benjamin-moore', family: 'grays', code: 'OC-52' },
  { name: 'Gentleman\'s Gray', hex: '#474D5B', brand: 'benjamin-moore', family: 'grays', code: '2062-20' },
  // Neutrals
  { name: 'Pale Oak', hex: '#D5CABD', brand: 'benjamin-moore', family: 'neutrals', code: 'OC-20' },
  { name: 'Swiss Coffee', hex: '#DDD5C3', brand: 'benjamin-moore', family: 'neutrals', code: 'OC-45' },
  { name: 'Balboa Mist', hex: '#CEC6B5', brand: 'benjamin-moore', family: 'neutrals', code: 'OC-27' },
  { name: 'Manchester Tan', hex: '#C4B7A0', brand: 'benjamin-moore', family: 'neutrals', code: 'HC-81' },
  // Blues
  { name: 'Hale Navy', hex: '#3F4F6A', brand: 'benjamin-moore', family: 'blues', code: 'HC-154' },
  { name: 'Newburyport Blue', hex: '#354D6B', brand: 'benjamin-moore', family: 'blues', code: 'HC-155' },
  { name: 'Van Deusen Blue', hex: '#3C5A7D', brand: 'benjamin-moore', family: 'blues', code: 'HC-156' },
  { name: 'Palladian Blue', hex: '#B5CECD', brand: 'benjamin-moore', family: 'blues', code: 'HC-144' },
  { name: 'Wythe Blue', hex: '#8CB0B0', brand: 'benjamin-moore', family: 'blues', code: 'HC-143' },
  { name: 'Blue Note', hex: '#4A5B6D', brand: 'benjamin-moore', family: 'blues', code: 'HC-154' },
  // Greens
  { name: 'Aegean Teal', hex: '#5B8A8F', brand: 'benjamin-moore', family: 'greens', code: '2136-40' },
  { name: 'Quiet Moments', hex: '#B4CCC5', brand: 'benjamin-moore', family: 'greens', code: '1563' },
  { name: 'Sage Green', hex: '#8A9979', brand: 'benjamin-moore', family: 'greens', code: '2138-40' },
  { name: 'Rosemary Sprig', hex: '#6B7D5D', brand: 'benjamin-moore', family: 'greens', code: '2144-30' },
  { name: 'October Mist', hex: '#C2BCA0', brand: 'benjamin-moore', family: 'greens', code: '1495' },
  // Warm
  { name: 'Raspberry Blush', hex: '#BF5B6F', brand: 'benjamin-moore', family: 'warm', code: '2008-30' },
  { name: 'Caliente', hex: '#C0392B', brand: 'benjamin-moore', family: 'bold', code: 'AF-290' },
  { name: 'Horizon', hex: '#C4B399', brand: 'benjamin-moore', family: 'warm', code: 'OC-53' },
  { name: 'Muslin', hex: '#D8CDBA', brand: 'benjamin-moore', family: 'warm', code: 'OC-12' },

  // ─── Sherwin-Williams ───────────────────────────────────────
  // Whites
  { name: 'Alabaster', hex: '#EDEAE0', brand: 'sherwin-williams', family: 'whites', code: 'SW 7008' },
  { name: 'Pure White', hex: '#F0EDE5', brand: 'sherwin-williams', family: 'whites', code: 'SW 7005' },
  { name: 'Extra White', hex: '#F1F0EC', brand: 'sherwin-williams', family: 'whites', code: 'SW 7006' },
  { name: 'Snowbound', hex: '#EDE8DF', brand: 'sherwin-williams', family: 'whites', code: 'SW 7004' },
  // Grays
  { name: 'Agreeable Gray', hex: '#CBC4B4', brand: 'sherwin-williams', family: 'grays', code: 'SW 7029' },
  { name: 'Repose Gray', hex: '#C2BDB3', brand: 'sherwin-williams', family: 'grays', code: 'SW 7015' },
  { name: 'Mindful Gray', hex: '#B3ADA2', brand: 'sherwin-williams', family: 'grays', code: 'SW 7016' },
  { name: 'Dorian Gray', hex: '#A09D95', brand: 'sherwin-williams', family: 'grays', code: 'SW 7017' },
  { name: 'Iron Ore', hex: '#434341', brand: 'sherwin-williams', family: 'grays', code: 'SW 7069' },
  { name: 'Peppercorn', hex: '#5B5855', brand: 'sherwin-williams', family: 'grays', code: 'SW 7674' },
  // Neutrals
  { name: 'Accessible Beige', hex: '#C8BAA2', brand: 'sherwin-williams', family: 'neutrals', code: 'SW 7036' },
  { name: 'Kilim Beige', hex: '#C4B299', brand: 'sherwin-williams', family: 'neutrals', code: 'SW 6106' },
  { name: 'Urbane Bronze', hex: '#5A4F42', brand: 'sherwin-williams', family: 'neutrals', code: 'SW 7048' },
  { name: 'Redend Point', hex: '#B09487', brand: 'sherwin-williams', family: 'warm', code: 'SW 9081' },
  // Blues
  { name: 'Naval', hex: '#2F3E5A', brand: 'sherwin-williams', family: 'blues', code: 'SW 6244' },
  { name: 'Slate Blue', hex: '#6F7F8C', brand: 'sherwin-williams', family: 'blues', code: 'SW 7624' },
  { name: 'Silvermist', hex: '#B5C4C6', brand: 'sherwin-williams', family: 'blues', code: 'SW 7621' },
  { name: 'Rainwashed', hex: '#C1D0C8', brand: 'sherwin-williams', family: 'blues', code: 'SW 6211' },
  // Greens
  { name: 'Sea Salt', hex: '#C0CFC1', brand: 'sherwin-williams', family: 'greens', code: 'SW 6204' },
  { name: 'Comfort Gray', hex: '#C1CAB8', brand: 'sherwin-williams', family: 'greens', code: 'SW 6205' },
  { name: 'Evergreen Fog', hex: '#8D9380', brand: 'sherwin-williams', family: 'greens', code: 'SW 9130' },
  { name: 'Pewter Green', hex: '#6E7C6A', brand: 'sherwin-williams', family: 'greens', code: 'SW 6208' },
  // Bold
  { name: 'Tricorn Black', hex: '#2C2C2C', brand: 'sherwin-williams', family: 'bold', code: 'SW 6258' },
  { name: 'Passionate Purple', hex: '#6B4C6A', brand: 'sherwin-williams', family: 'bold', code: 'SW 6981' },

  // ─── Chicago Favorites ──────────────────────────────────────
  { name: 'Lake Michigan Blue', hex: '#5A7D9A', brand: 'chicago-favorites', family: 'blues' },
  { name: 'Wrigley Ivy', hex: '#4D7A5E', brand: 'chicago-favorites', family: 'greens' },
  { name: 'Lincoln Park Sage', hex: '#9AAA8C', brand: 'chicago-favorites', family: 'greens' },
  { name: 'Gold Coast Cream', hex: '#E8DFC9', brand: 'chicago-favorites', family: 'neutrals' },
  { name: 'Greystone Gray', hex: '#9E9B91', brand: 'chicago-favorites', family: 'grays' },
  { name: 'Prairie Wheat', hex: '#D4C4A0', brand: 'chicago-favorites', family: 'warm' },
  { name: 'Navy Pier', hex: '#2E4057', brand: 'chicago-favorites', family: 'blues' },
  { name: 'North Shore White', hex: '#F4F0E6', brand: 'chicago-favorites', family: 'whites' },
  { name: 'Bucktown Charcoal', hex: '#4A4A4A', brand: 'chicago-favorites', family: 'grays' },
  { name: 'River North Loft', hex: '#B8A48A', brand: 'chicago-favorites', family: 'neutrals' },
  { name: 'Andersonville Blue', hex: '#7DA0B6', brand: 'chicago-favorites', family: 'blues' },
  { name: 'Logan Square Olive', hex: '#7D7F5E', brand: 'chicago-favorites', family: 'greens' },
  { name: 'Lakeview Mist', hex: '#C5D1CF', brand: 'chicago-favorites', family: 'blues' },
  { name: 'Pilsen Coral', hex: '#D98070', brand: 'chicago-favorites', family: 'warm' },
  { name: 'Hyde Park Walnut', hex: '#6B5344', brand: 'chicago-favorites', family: 'bold' },
  { name: 'Ravenswood Rose', hex: '#C9A9A0', brand: 'chicago-favorites', family: 'warm' },

  // ─── Trending 2025 ─────────────────────────────────────────
  { name: 'Mocha Mousse', hex: '#A47764', brand: 'trending-2025', family: 'warm' },
  { name: 'Cracked Pepper', hex: '#514B45', brand: 'trending-2025', family: 'grays' },
  { name: 'Dried Lavender', hex: '#A89BB5', brand: 'trending-2025', family: 'bold' },
  { name: 'Butter Cream', hex: '#F0DEB4', brand: 'trending-2025', family: 'warm' },
  { name: 'Terracotta Rise', hex: '#C27B5C', brand: 'trending-2025', family: 'warm' },
  { name: 'Deep Ocean', hex: '#2C5F7C', brand: 'trending-2025', family: 'blues' },
  { name: 'Sage Revival', hex: '#8F9F82', brand: 'trending-2025', family: 'greens' },
  { name: 'Warm Charcoal', hex: '#4E4843', brand: 'trending-2025', family: 'grays' },
  { name: 'Soft Peach', hex: '#E8CFC0', brand: 'trending-2025', family: 'warm' },
  { name: 'Forest Floor', hex: '#3D5142', brand: 'trending-2025', family: 'greens' },
  { name: 'Dusty Rose', hex: '#C8A2A2', brand: 'trending-2025', family: 'warm' },
  { name: 'Midnight Teal', hex: '#1F4E5F', brand: 'trending-2025', family: 'bold' },
  { name: 'Stone Wash', hex: '#B5B0A5', brand: 'trending-2025', family: 'grays' },
  { name: 'Honeyed Gold', hex: '#C9A84C', brand: 'trending-2025', family: 'warm' },
]

export function getColorsByBrand(brand: ColorBrand): PaintColor[] {
  return PAINT_COLORS.filter((c) => c.brand === brand)
}

export function getColorsByFamily(family: ColorFamily): PaintColor[] {
  return PAINT_COLORS.filter((c) => c.family === family)
}

export function searchColors(query: string): PaintColor[] {
  const q = query.toLowerCase()
  return PAINT_COLORS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.code && c.code.toLowerCase().includes(q)) ||
      c.hex.toLowerCase().includes(q)
  )
}
