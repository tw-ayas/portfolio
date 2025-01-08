// App.js
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Pages } from "./components/Pages/Pages";
import { darkTheme, lightTheme } from "./components/theme";
import {
	RouterContext,
	RouterContextLocation
} from "./components/utils/RouterContext";
import { useScrollPageOnLoadToRoute } from "./components/utils/useScrollPageOnLoadToRoute";
import { Website } from "./components/Website";
import { DarkLightModeThemeProvider } from "./lib/DarkLightModeThemeProvider";

function App() {
	const windowRef = useRef(
		typeof window !== "undefined" ? window : undefined,
	);
	const {
		scrollToPage,
		scrollerRef,
		// scrollNext,
		// scrollPrevious,
		// currentPageIndex,
	} = useScrollPageOnLoadToRoute();
	const loc = windowRef.current?.location;
	const [location, setLocation] = useState<RouterContextLocation>({
		location: loc?.href ?? "",
		clickChange: false,
		url: new URL(loc?.href ?? ""),
		hostname: loc?.hostname ?? "",
		pathname: loc?.pathname ?? "",
		title: document.title,
		base: (loc?.href ?? "").replace(loc?.pathname ?? "", ""),
		scrollToPage,
		scrollerRef,
	});
	const pages = Pages.map((page) => `/${page.id}`);

	useEffect(() => {
		const popStateListener = windowRef.current
			? windowRef.current.addEventListener("popstate", function () {
					const loc = windowRef.current?.location;
					setLocation((prev) => ({
						...prev,
						location: loc?.href ?? "",
						clickChange: true,
						url: new URL(loc?.href ?? ""),
						hostname: loc?.hostname ?? "",
						pathname: loc?.pathname ?? "",
						title: document.title,
						base: (loc?.href ?? "").replace(
							loc?.pathname ?? "",
							"",
						),
					}));
					scrollToPage(
						pages.includes(loc?.pathname ?? "")
							? pages.findIndex(
									(page) => page === loc?.pathname,
								) + 1
							: 0,
					);
				})
			: null;
		// const keyUpListener = windowRef.current
		// 	? windowRef.current.addEventListener("keyup", function (e) {
		// 			let page: ContentWrapperProps | null = null;
		// 			if (e.code === "ArrowUp") {
		// 				page = Pages[Math.max(currentPageIndex - 1, 0)];
		// 				// scrollPrevious();
		// 			}
		// 			if (e.code === "ArrowDown") {
		// 				page =
		// 					Pages[
		// 						Math.min(currentPageIndex + 1, Pages.length + 1)
		// 					];
		// 				// scrollNext();
		// 			}
		// 			if (page && windowRef.current) {
		// 				const hrefFormat = page.id?.startsWith("/")
		// 					? page.id
		// 					: `${location.pathname.startsWith("/") ? location.pathname.slice(1) : location.url.pathname}/${page.id}`;
		// 				const title = page.title
		// 				windowRef.current.history.pushState({}, location.title, location.url)
		// 				windowRef.current.history.replaceState({}, title ?? "", hrefFormat)

		// 				setLocation((prev) => ({
		// 					...prev,
		// 					url: new URL(hrefFormat, location.base),
		// 					title,
		// 					location: `${location.base}/${hrefFormat}`,
		// 					clickChange: true,
		// 					pathname: hrefFormat,
		// 				}));
		// 			}
		// 		})
		// 	: null;
		return () => {
			if (popStateListener)
				window.removeEventListener("popstate", popStateListener);
			// if (keyUpListener)
			// 	window.removeEventListener("keyup", keyUpListener);
		};
	});

	return (
		<DarkLightModeThemeProvider light={lightTheme} dark={darkTheme}>
			<RouterContext.Provider value={{ ...location, setLocation }}>
				<Website />
			</RouterContext.Provider>
		</DarkLightModeThemeProvider>
	);
}

export default App;
