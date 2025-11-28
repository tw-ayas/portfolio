import { pages } from "../Pages/Pages";
import { useChildScrollTo } from "./useChildScrollTo";
import { useCallback } from "react";

export function useScrollPageOnLoadToRoute() {
    const handlePageChange = useCallback((index: number) => {
        // Update URL based on the visible page
        // Index 0 is hero, pages start at index 1
        if (index === 0) {
            // Hero section - go to root
            window.history.replaceState(null, "", "/");
        } else if (index > 0 && index <= pages.length) {
            // Page sections
            const page = pages[index - 1];
            if (page?.id) {
                window.history.replaceState(null, "", `/${page.id}`);
            }
        }
    }, []);

    const { ref, setShouldScrollTo: scrollPageToPageIndex, currentPageIndex, currentVisibleIndex } =
        useChildScrollTo<HTMLDivElement>(handlePageChange);

    const scrollToPage = (index: number = 0) => {
        scrollPageToPageIndex(index);
    };

    const scrollNext = () => {
        const newIndex = Math.min(currentPageIndex + 1, pages.length + 1);
        if (newIndex !== currentPageIndex) scrollPageToPageIndex(newIndex);
    };

    const scrollPrevious = () => {
        const newIndex = Math.max(currentPageIndex - 1, 0);
        if (newIndex !== currentPageIndex) scrollPageToPageIndex(newIndex);
    };

    return {
        scrollerRef: ref,
        scrollToPage,
        scrollNext,
        scrollPrevious,
        currentPageIndex,
        currentVisibleIndex
    };
}