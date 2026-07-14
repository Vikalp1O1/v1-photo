import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Reusable hook for fetching data from the API.
 *
 * @param {Function} fetchFn — async function that calls an endpoint (receives AbortSignal)
 * @param {Array} deps — dependency array (re-fetches when deps change)
 * @returns {{ data, meta, loading, error, refetch }}
 *
 * @example
 *   const { data: banners, loading } = useApi(() => bannerApi.list())
 *   const { data: category } = useApi(() => categoryApi.getBySlug(slug), [slug])
 */
export default function useApi(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Keep fetchFn ref stable to avoid re-triggering from closure changes
  const fetchFnRef = useRef(fetchFn)
  fetchFnRef.current = fetchFn

  const execute = useCallback(async (signal) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchFnRef.current(signal)
      if (!signal?.aborted) {
        setData(result.data)
        setMeta(result.meta)
      }
    } catch (err) {
      if (!signal?.aborted) {
        setError(err)
        console.error('[useApi]', err.message)
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    execute(controller.signal)
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const refetch = useCallback(() => {
    execute(new AbortController().signal)
  }, [execute])

  return { data, meta, loading, error, refetch }
}
