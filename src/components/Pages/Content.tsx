import HeroBanner from "./HeroBanner";
import {Pages} from "./Pages";
import {ContentWrapper} from "./ContentWrapper";
import {Container} from "@mui/material";
import { useContext } from "react";
import { RouterContext } from "../utils/RouterContext";

// type ContentProps = {
//     // scrollerRef?:((instance: (HTMLDivElement | null)) => void) | React.RefObject<HTMLDivElement> | null | undefined
// }
export function Content(){
    const location = useContext(RouterContext)

    return (
        <Container
            ref={location?.scrollerRef}
            maxWidth={false}
            id="MainContainer-root"
            disableGutters={true}
            sx={(theme) => ({
				height: { xs: `calc(100dvh - ${theme.appShell.appBarHeightSm})`, md: `calc(100dvh - ${theme.appShell.appBarHeightMd})` },
                overflowX: "hidden",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                zIndex: 0,
                '& > *:first-of-type': {
                 height: `100%`,scrollSnapAlign: 'center none',
                },
                '& > *:not(:first-of-type)': {
                    height: `100%`,
                    scrollSnapAlign: 'center none',
                    position: 'relative',
                    margin: `0 auto`,
                    [theme.breakpoints.down('md')]: {
                        // padding: '0 !important',
                        // paddingTop: `${theme.appShell.appBarHeightSm} !important`,
                    },
                    background: theme.palette.background.paper,
                },
                '& > *:nth-of-type(even)': {
                	background: theme.palette.background.default,
                }
            })}
        >
            <HeroBanner/>
            {Pages.map((page) => <ContentWrapper key={page.id} {...page}>{page.children}</ContentWrapper>)}
        </Container>
    )
}