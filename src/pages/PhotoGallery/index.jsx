import React from 'react';
import AlbumSlider from '@/components/AlbumSlider';
import useApi from '@/hooks/useApi';
import { categoryApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';

const PhotoGallery = () => {
  const { data: categories, loading } = useApi(() =>
    categoryApi.list({ limit: 20 })
  );

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white font-button text-sm tracking-widest uppercase animate-pulse">
          Loading Gallery...
        </div>
      </div>
    );
  }

  const albums = (categories || []).map((cat) => ({
    id: cat.slug,
    title: cat.name,
    location: cat.shortDescription || '',
    coverImage: resolveImageSrc(cat.coverImage || cat.image, PLACEHOLDER_IMAGE),
    description: cat.description || cat.shortDescription || '',
  }));

  return <AlbumSlider albums={albums} basePath="/photo-gallery" />;
};

export default PhotoGallery;
