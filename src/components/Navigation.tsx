// Navigation.js
import {
    Box,
    Container,
    Fab,
    List,
    ListItem,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useColorMode } from "../lib/DarkLightModeThemeProvider";
import { IconSvg } from "./IconSvg";
import { pages as pagess } from "./Pages/Pages";
import { fontSize, responsiveVal } from "./theme";
import { WebsiteName } from "./utils/Constant";
import { LinkWrap } from "./utils/LinkWrap";
import { RouterContext } from "./utils/RouterContext";

// type NavigationProps = {
// 	// scrollToPage: (index: number) => void;
// };
const Navigation = () => {
    const [mobMenuActive, setMobMenuActive] = useState(false);
    const location = useContext(RouterContext);
    const pages = pagess.map((page) => `/${page.id}`);

    useEffect(() => {
        if (
            !location?.clickChange &&
            location?.pathname &&
            pages.includes(location.pathname) &&
            location.scrollerRef.current
        )
            location.scrollerRef.current.children[
                pages.findIndex((page) => page === location.pathname) + 1
            ].scrollIntoView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.pathname]);

    useEffect(() => {
        if (location?.setLocation && location?.clickChange)
            location.setLocation((prev) => ({ ...prev, clickChange: false }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.clickChange, location?.setLocation]);

    const { currentMode, toggle } = useColorMode();

    const hamburgerLineSx: SxProps<Theme> = (theme) => ({
        width: "35px",
        height: "3px",
        margin: "5px auto",
        background: theme.palette.text.primary,
        transition: "all 350ms cubic-bezier(0.47, 0, 0.745, 0.715)",
    });

    return (
        <Container
            maxWidth={false}
            disableGutters={true}
            sx={(theme) => ({
                width: "100%",
                zIndex: "100",
                backgroundColor: theme.palette.background.contrast,
                color: theme.palette.text.primary,
                height: {
                    xs: theme.appShell.appBarHeightSm,
                    md: theme.appShell.appBarHeightMd,
                },
            })}
            className="HeaderContainer-root"
        >
            <Box
                className="NavigationContainer-root"
                sx={(theme) => ({
                    width: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "0 auto",
                    position: "relative",
                    height: "100%",
                    px: { xs: theme.spacings.sm, md: theme.spacings.md },
                    // py: theme.spacings.xxs,
                })}
            >
                <Typography
                    className="site-name"
                    variant="h2"
                    component="h1"
                    sx={() => ({
                        ...fontSize(28, 36),
                        fontVariationSettings: "'wght' 700",
                        "& a": {
                            color: "#000000 !important",
                            textDecoration: "underline",
                            textDecorationColor: "#ffffff99",
                            textDecorationThickness: "6px",
                        },
                    })}
                >
                    <LinkWrap href="/" onClick={() => setMobMenuActive(false)}>
                        {WebsiteName}
                    </LinkWrap>
                </Typography>
                <List
                    sx={(theme) => ({
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        top: {
                            xs: theme.appShell.appBarHeightSm,
                            md: theme.appShell.appBarHeightMd,
                        },
                        // transform: mobMenuActive ? `translateX(0)` : `translateX(100%)`,
                        right: mobMenuActive ? 0 : "-100%",
                        transition: `right 500ms cubic-bezier(0.47, 0, 0.745, 0.715)`,
                        position: "absolute",
                        height: `calc(100dvh - ${theme.appShell.appBarInnerHeightSm})`,
                        [theme.breakpoints.up("md")]: {
                            width: "auto",
                            height: "auto",
                            position: "static",
                            flexDirection: "row",
                            ".MuiListItem-root": {
                                // marginLeft: "20px",
                                p: 0,
                            },
                            a: {
                                width: "auto",
                            },
                        },
                    })}
                >
                    {pagess.map((page) => (
                        <ListItem
                            key={page.id}
                            sx={(theme) => ({
                                [theme.breakpoints.down("md")]: {
                                    backgroundColor: `${theme.palette.secondary.main}`,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                },
                                // "&:hover": {
                                // 	background: `${theme.palette.background.contrast}60`,
                                // },
                            })}
                        >
                            <LinkWrap
                                sx={(theme) => ({
                                    textDecoration: "none",
                                    textWrap: "nowrap",
                                    p: `${responsiveVal(10, 16)} ${theme.spacings.md}`,
                                    display: "block",
                                    color: theme.palette.text.primary,
                                    "&:hover": {
                                        background: `${theme.palette.background.default}60`,
                                    },
                                })}
                                href={`/${page.id}`}
                                onClick={() => setMobMenuActive(false)}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: "600",
                                        fontVariationSettings: "'wght' 600",
                                    }}
                                >
                                    {page.title}
                                </Typography>
                            </LinkWrap>
                        </ListItem>
                    ))}
                    <ListItem
                        key="theme-change"
                        sx={(theme) => ({
                            [theme.breakpoints.down("md")]: {
                                backgroundColor: `${theme.palette.secondary.main}`,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                        })}
                    >
                        <Fab
                            sx={(theme) => ({
                                textDecoration: "none",
                                textWrap: "nowrap",
                                p: 0,
                                lineHeight: "normal",
                                display: "block",
                                color: theme.palette.text.primary,
                                "&:hover": {
                                    // background: `${theme.palette.background.contrast}60`,
                                    boxShadow: "none",
                                },
                                width: "54px",
                                minWidth: "54px",
                                height: "54px",
                                "& svg": {
                                    stroke: theme.palette.text.primary,
                                },
                                boxShadow: "none",
                                [theme.breakpoints.down("md")]: {
                                    backgroundColor: `${theme.palette.secondary.main} !important`,
                                },
                            })}
                            onClick={() => {
                                toggle();
                                // setMobMenuActive(false);
                            }}
                        >
                            {currentMode === "light" ? (
                                <IconSvg src="/icons/moon.svg" />
                            ) : (
                                <IconSvg src="/icons/sun.svg" />
                            )}
                        </Fab>
                    </ListItem>
                    <ListItem
                        onClick={() => setMobMenuActive(false)}
                        sx={(theme) => ({
                            height: "100%",
                            background: `${theme.palette.background.contrast}05`,
                            backdropFilter: "blur(2px)",
                            // opacity: mobMenuActive ? '1' : '0',
                        })}
                    />
                </List>
                <Box
                    className="hamburger-menu"
                    onClick={() => setMobMenuActive((prev) => !prev)}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        flexDirection: "column",
                    }}
                >
                    <Box
                        component="span"
                        sx={[
                            hamburgerLineSx,
                            {
                                transform: mobMenuActive
                                    ? "rotate(45deg) translate(6px, 12px)"
                                    : undefined,
                            },
                        ]}
                    />
                    <Box
                        component="span"
                        sx={[
                            hamburgerLineSx,
                            {
                                opacity: mobMenuActive ? 0 : 1,
                            },
                        ]}
                    />
                    <Box
                        component="span"
                        sx={[
                            hamburgerLineSx,
                            {
                                transform: mobMenuActive
                                    ? "rotate(-45deg) translate(6px, -12px)"
                                    : undefined,
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Navigation;
