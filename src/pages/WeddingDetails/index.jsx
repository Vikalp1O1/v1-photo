import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AlbumDetails from '@/components/AlbumDetails';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';
import { weddingApi } from '@/lib/endpoints';

const WeddingDetails = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingPhotos, setFetchingPhotos] = useState(false);

  // Initial Load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch wedding details
        const detailsRes = await weddingApi.getBySlug(slug);
        setCategory(detailsRes.data);
        
        // Fetch first page of photos
        const photosRes = await weddingApi.getPhotos(slug, { page: 1, limit: 12 });
        const fetchedPhotos = photosRes.data.map(img => resolveImageSrc(img)).filter(Boolean);
        setPhotos(fetchedPhotos);
        
        if (photosRes.meta.page >= photosRes.meta.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [slug]);

  // Infinite Scroll Load
  const loadMorePhotos = async () => {
    if (fetchingPhotos || !hasMore || !category) return;
    try {
      setFetchingPhotos(true);
      const nextPage = page + 1;
      
      // Artificial delay so the skeleton is visible
      await new Promise(resolve => setTimeout(resolve, 800));

      const res = await weddingApi.getPhotos(slug, { page: nextPage, limit: 12 });
      const newPhotos = res.data.map(img => resolveImageSrc(img)).filter(Boolean);
      
      setPhotos(prev => [...prev, ...newPhotos]);
      setPage(nextPage);
      
      if (nextPage >= res.meta.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load more photos', err);
    } finally {
      setFetchingPhotos(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="font-button text-sm tracking-widest text-primary uppercase animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !category) {
    return <Navigate to="/weddings" replace />;
  }

  const album = {
    title: category.coupleName,
    description: category.description || '',
    location: '',
    photos: photos.length > 0 ? photos : [PLACEHOLDER_IMAGE],
  };

  return <AlbumDetails album={album} backPath="/weddings" hasMore={hasMore} onLoadMore={loadMorePhotos} />;
};

export default WeddingDetails;
