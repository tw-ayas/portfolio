import { useRef, useState} from "react";

export const useChildScrollTo = <T extends Element>() => {
    const ref = useRef<T>(null);
    const [shouldScrollTo, setShouldScrollTo] = useState<number>(-1);
    const scroll = (index: number) => {
        setShouldScrollTo(index)
        // console.log("scrollTo", index)
        if (index !== shouldScrollTo && ref.current && index >= 0 && index < ref.current.children.length) {
			ref.current.children[index].scrollIntoView({ behavior: "smooth" });
        }
    }

    return {ref: ref, setShouldScrollTo: scroll, 
    currentPageIndex: shouldScrollTo
    };
};