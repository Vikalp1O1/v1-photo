const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

/**
 * Resolve a backend image asset object to a full URL.
 * Handles both `{ url: '/uploads/...' }` objects and raw string URLs.
 *
 * @param {Object|string|null} imageAsset — image asset from API
 * @returns {string|null} — full image URL or null
 */
export function resolveImageUrl(imageAsset) {
  if (!imageAsset) return null

  const url = typeof imageAsset === 'string' ? imageAsset : imageAsset.url
  if (!url) return null

  // Already an absolute URL (external images like unsplash)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Relative path from backend — prepend backend URL
  return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Resolve an image asset with a fallback placeholder.
 *
 * @param {Object|string|null} imageAsset
 * @param {string} fallback — fallback image URL
 * @returns {string} — resolved URL or fallback
 */
export function resolveImageSrc(imageAsset, fallback = '') {
  return resolveImageUrl(imageAsset) || fallback
}

/**
 * Default placeholder for missing images.
 */
export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=60'
