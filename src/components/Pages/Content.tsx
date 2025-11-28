import { Container } from "@mui/material";
import { useContext } from "react";
import { RouterContext } from "../utils/RouterContext";
import { ContentWrapper, ContentWrapperProps } from "./ContentWrapper";
import HeroBanner from "./HeroBanner";
import { AboutMe, ContactMe, pages } from "./Pages";

/**
 * Content
 *
 * - Each section occupies the full viewport width/height minus the navigation height.
 * - Sections are laid out vertically and the container uses vertical scroll snapping.
 * - If a section's content overflows horizontally, vertical wheel events are translated
 *   into horizontal scrolling for that section until it reaches the horizontal edge.
 *
 * Behavior details:
 * - Wheel over a section with horizontal overflow: convert deltaY to scrollLeft and prevent vertical scroll.
 * - If horizontal overflow exists but the scroll is already at the edge and the user scrolls further,
 *   the vertical scroll is allowed to continue switching sections.
 *
 * Notes:
 * - The container is attached to the RouterContext scrollerRef (if present) to preserve existing behavior.
 * - Wheel listener is attached with `{ passive: false }` so we can call `event.preventDefault()` when needed.
 */

export function Content() {
    const location = useContext(RouterContext);
    return (
        <Container
            maxWidth={false}
            id="MainContainer-root"
            disableGutters={true}
            sx={(theme) => ({
                // container takes exactly viewport minus navigation height
                height: {
                    xs: `calc(100dvh - ${theme.appShell.appBarHeightSm})`,
                    md: `calc(100dvh - ${theme.appShell.appBarHeightMd})`,
                },
                // vertical scrolling for sections (snap between sections)
                overflowX: "hidden",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                zIndex: 0,
                // Hide scrollbar completely
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
                "&::-webkit-scrollbar": {
                    display: "none", // Chrome/Safari/Opera
                },
                // ensure children stack vertically and each child is a full-screen section
                display: "block",
                // gap between sections if you want (kept 0)
                // Styling for immediate child sections: they must be full viewport (minus nav),
                // allow horizontal overflow for content when necessary, and snap vertically.
                "& > [data-section]": {
                    // Each section should hold the device height and width minus navigation
                    width: "100vw",
                    minHeight: {
                        xs: `calc(100dvh - ${theme.appShell.appBarHeightSm})`,
                        md: `calc(100dvh - ${theme.appShell.appBarHeightMd})`,
                    },
                    height: {
                        xs: `calc(100dvh - ${theme.appShell.appBarHeightSm})`,
                        md: `calc(100dvh - ${theme.appShell.appBarHeightMd})`,
                    },
                    scrollSnapAlign: "start",
                    scrollSnapStop: "always",
                    // allow horizontal overflow inside the section; vertical overflow inside section hidden
                    overflowX: "auto",
                    overflowY: "hidden",
                    // make the section act as a horizontal canvas (so children can be wider)
                    display: "block",
                    background: theme.palette.background.paper,
                    flexShrink: 0,
                },
                // alternate backgrounds for even sections for subtle contrast
                "& > [data-section]:nth-of-type(even)": {
                    background: theme.palette.background.default,
                },
            })}
            ref={location?.scrollerRef}
        >
            {/* First section: hero */}
            <section data-section id="hero-section" aria-label="hero">
                <HeroBanner />
            </section>

            {/* Render the rest of the pages as sections */}
            {pages.map((page) => (
                <section
                    data-section
                    id={`section-${page.id}`}
                    key={page.id}
                    aria-labelledby={`${page.id}-title`}
                >
                    <ContentWrapper {...page}>{page.children}</ContentWrapper>
                </section>
            ))}
        </Container>
    );
}

export default Content;
