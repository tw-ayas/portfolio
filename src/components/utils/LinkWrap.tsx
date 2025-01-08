import {Link, LinkProps} from "@mui/material";
import {EventHandler, useContext, useRef} from "react";
import { Pages } from "../Pages/Pages";
import { RouterContext} from "./RouterContext";

type LinkWrapProps = LinkProps & {
    onClick?: EventHandler<any>
}

export function LinkWrap(props: LinkWrapProps) {
    const {onClick, href = '', title} = props
    const location = useContext(RouterContext)
    const windowRef = useRef(typeof window !== "undefined" ? window : null)
    const pages = Pages.map((page) => `/${page.id}`)
    
    return <Link {...props} onClick={(e) => {
        if (onClick) onClick(e);
        if (location && windowRef.current && href !== '') {
        	const hrefFormat = href?.startsWith("/") ? href : `${location.pathname.startsWith("/") ? location.pathname.slice(1,) : location.url.pathname}/${href}`
			windowRef.current.history.pushState({}, location.title, location.url)
			windowRef.current.history.replaceState({}, title ?? "", hrefFormat)
			if (location?.scrollToPage)
            	location.scrollToPage(pages.includes(hrefFormat) ? pages.findIndex((page) => page === hrefFormat) + 1 : 0)
			location.setLocation((prev) => ({
				...prev,
				url: new URL(hrefFormat, location.base),
				title: title ?? "",
				location: `${location.base}/${hrefFormat}`,
				clickChange: true,
				pathname: hrefFormat
			}))
        }
        e.stopPropagation()
        e.preventDefault()
    }}/>
}