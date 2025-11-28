import { useRef, useState, useEffect } from "react";

export const useChildScrollTo = <T extends Element>(onPageChange?: (index: number) => void) => {
    const ref = useRef<T>(null);
    const [shouldScrollTo, setShouldScrollTo] = useState<number>(-1);
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isScrollingRef = useRef<boolean>(false);

    const scroll = (index: number) => {
        setShouldScrollTo(index)
        // console.log("scrollTo", index)
        if (index !== shouldScrollTo && ref.current && index >= 0 && index < ref.current.children.length) {
			ref.current.children[index].scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const handleScroll = () => {
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Mark scrolling as started
            if (!isScrollingRef.current) {
                isScrollingRef.current = true;
            }

            // Set timeout to detect scroll end
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;

                // Detect which section is currently visible
                const containerRect = container.getBoundingClientRect();
                const containerMidpoint = containerRect.top + containerRect.height / 2;

                let closestIndex = 0;
                let closestDistance = Infinity;

                Array.from(container.children).forEach((child, index) => {
                    const childRect = child.getBoundingClientRect();
                    const childMidpoint = childRect.top + childRect.height / 2;
                    const distance = Math.abs(childMidpoint - containerMidpoint);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });

                // If page changed, update state and call callback
                if (closestIndex !== currentVisibleIndex) {
                    setCurrentVisibleIndex(closestIndex);
                    if (onPageChange) {
                        onPageChange(closestIndex);
                    }
                }
            }, 150); // Wait 150ms after scroll stops
        };

        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [currentVisibleIndex, onPageChange]);

    return {
        ref: ref,
        setShouldScrollTo: scroll,
        currentPageIndex: shouldScrollTo,
        currentVisibleIndex: currentVisibleIndex
    };
};