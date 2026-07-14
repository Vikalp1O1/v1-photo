import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AlbumDetails from '@/components/AlbumDetails';
import useApi from '@/hooks/useApi';
import { categoryApi, photoApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';

const PhotoGalleryDetails = () => {
  const { slug } = useParams();
  const { data: category, loading, error } = useApi(
    () => categoryApi.getBySlug(slug),
    [slug]
  );

  const { data: photosResponse, loading: photosLoading } = useApi(
    () => photoApi.getAll({ limit: 100, category: category?._id }),
    [category?._id],
    { execute: !!category?._id }
  );

  if (loading || photosLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="font-button text-sm tracking-widest text-primary uppercase animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !category) {
    return <Navigate to="/photo-gallery" replace />;
  }

  const photos = (photosResponse || [])
    .map((photo) => resolveImageSrc(photo.image))
    .filter(Boolean);

  const album = {
    title: category.name,
    description: category.description || category.shortDescription || '',
    location: category.shortDescription || '',
    photos: photos.length > 0 ? photos : [PLACEHOLDER_IMAGE],
  };

  return <AlbumDetails album={album} backPath="/photo-gallery" />;
};

export default PhotoGalleryDetails;
