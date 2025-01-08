import { createContext } from "react";

export type RouterContextLocation = {
		clickChange: boolean
		hostname: string
		location: string
		pathname: string
		url: URL
		title: string
		base: string
		scrollToPage: (index?: number) => void
		scrollerRef: React.RefObject<HTMLDivElement>
}
export type RouterContextProps = RouterContextLocation & {
	setLocation: React.Dispatch<React.SetStateAction<RouterContextLocation>>
}


export const RouterContext = createContext<RouterContextProps | null>(null)
