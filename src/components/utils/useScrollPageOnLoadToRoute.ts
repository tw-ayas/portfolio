import { Pages } from "../Pages/Pages";
import {useChildScrollTo} from "./useChildScrollTo";

export function useScrollPageOnLoadToRoute() {
    const {ref , setShouldScrollTo: scrollPageToPageIndex, currentPageIndex} = useChildScrollTo<HTMLDivElement>()

	const scrollToPage = (index: number = 0) => {
		scrollPageToPageIndex(index)
	}

    const scrollNext = () => {
   		const newIndex = Math.min(currentPageIndex + 1, Pages.length + 1)
    	if (newIndex !== currentPageIndex) scrollPageToPageIndex(newIndex)
    }
    
    const scrollPrevious = () => {
    	const newIndex = Math.max(currentPageIndex - 1, 0)
     	if (newIndex !== currentPageIndex) scrollPageToPageIndex(newIndex)
    }

    return {scrollerRef: ref, scrollToPage, scrollNext, scrollPrevious, currentPageIndex}
}