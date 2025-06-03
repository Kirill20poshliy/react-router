import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfinityScroll = <T>(
    fetchFn: (page: number) => Promise<T[]>,
    initialPage = 1
) => {
    const [page, setPage] = useState(initialPage);
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);
        try {
            const newItems = await fetchFn(page);
            setItems(prev => [...prev, ...newItems]);
            setPage(prev => prev + 1);
            setHasMore(newItems.length > 0);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn, page, isLoading, hasMore]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (triggerRef.current) {
            observerRef.current.observe(triggerRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [loadMore, hasMore, isLoading]);

    useEffect(() => {
        loadMore();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { items, isLoading, hasMore, error, triggerRef };
};