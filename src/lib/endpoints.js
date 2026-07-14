import api from './api'

// ─── Banners ──────────────────────────────────────────────
export const bannerApi = {
  list: () => api.get('/banners'),
}

// ─── Categories (Photo Gallery / Weddings) ────────────────
export const categoryApi = {
  list: (params = {}) => api.get('/categories', { params }),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
}

export const photoApi = {
  getAll: (params) => api.get('/photos', { params }),
}

export const awesomeShootApi = {
  getAll: (params) => api.get('/awesome-shoots', { params }),
}

// ─── Weddings ─────────────────────────────────────────────
export const weddingApi = {
  list: (params = {}) => api.get('/weddings', { params }),
  getBySlug: (slug) => api.get(`/weddings/${slug}`),
  getPhotos: (slug, params = {}) => api.get(`/weddings/${slug}/photos`, { params }),
}

// ─── Inquiries ─────────────────────────────────────────────
export const inquiryApi = {
  submit: (data) => api.post('/inquiries/submit', data),
}

// ─── Testimonials ─────────────────────────────────────────
export const testimonialApi = {
  list: (params = {}) => api.get('/testimonials', { params }),
}

// ─── Team Members ─────────────────────────────────────────
export const teamApi = {
  list: (params = {}) => api.get('/team', { params }),
}

// ─── Video Categories ─────────────────────────────────────
export const videoCategoryApi = {
  list: (params = {}) => api.get('/video-categories', { params }),
  getVideos: (slug, params = {}) =>
    api.get(`/video-categories/${slug}/videos`, { params }),
}

// ─── Videos ───────────────────────────────────────────────
export const videoApi = {
  list: (params = {}) => api.get('/videos', { params }),
  getBySlug: (slug) => api.get(`/videos/${slug}`),
}
