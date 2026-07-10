import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

// Lazy load the pages
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Weddings = lazy(() => import('@/pages/Weddings'))
const WeddingDetails = lazy(() => import('@/pages/WeddingDetails'))
const PhotoGallery = lazy(() => import('@/pages/PhotoGallery'))
const PhotoGalleryDetails = lazy(() => import('@/pages/PhotoGalleryDetails'))
const VideoGallery = lazy(() => import('@/pages/VideoGallery'))
const VideoGalleryDetails = lazy(() => import('@/pages/VideoGalleryDetails'))
const Team = lazy(() => import('@/pages/Team'))
function App() {
  return (
    <div className="min-h-screen bg-white text-text selection:bg-gold selection:text-white">
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-button text-sm tracking-widest text-primary uppercase">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="weddings" element={<Weddings />} />
            <Route path="weddings/:id" element={<WeddingDetails />} />
            <Route path="photo-gallery" element={<PhotoGallery />} />
            <Route path="photo-gallery/:id" element={<PhotoGalleryDetails />} />
            <Route path="video-gallery" element={<VideoGallery />} />
            <Route path="video-gallery/:id" element={<VideoGalleryDetails />} />
            <Route path="team" element={<Team />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
