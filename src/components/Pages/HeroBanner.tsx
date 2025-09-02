import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fontSize } from "../theme";
import background_dark from "./backgrounds/background-dark.jpeg";
import background from "./backgrounds/background.jpg";

export type HeroBannerProps = {
    name?: string;
    location?: string;
    role?: string;
    sector?: string;
    shortBio?: string;
    // IDs for CTAs to scroll to
    contactId?: string;
    aboutId?: string;
};

export default function HeroBanner(props: HeroBannerProps) {
    const {
        name = "Ayash Twayana",
        location = "Munich",
        role = "Software Engineer",
        sector = "ecommerce",
        shortBio = "I design and build scalable ecommerce solutions and apps — focusing on performant, accessible and maintainable frontend experiences.",
        contactId = "contact",
        aboutId = "about",
    } = props;

    // Small animated dots for subtle motion in subtitle
    const [dots, setDots] = useState<"" | "." | ".." | "...">("");
    useEffect(() => {
        const id = setInterval(() => {
            setDots((p) => {
                switch (p) {
                    case "":
                        return ".";
                    case ".":
                        return "..";
                    case "..":
                        return "...";
                    default:
                        return "";
                }
            });
        }, 800);
        return () => clearInterval(id);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            // fallback to top if element not found
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Box
            component="section"
            role="region"
            aria-label="Hero"
            sx={(theme) => ({
                position: "relative",
                minHeight: {
                    xs: `calc(100dvh - ${theme.appShell.appBarHeightSm})`,
                    md: `calc(100dvh - ${theme.appShell.appBarHeightMd})`,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                // Background image switches with theme mode; graceful fallback to gradient
                backgroundImage:
                    theme.palette.mode === "light"
                        ? `linear-gradient(to bottom right, rgba(0,0,0,0.25), rgba(0,0,0,0.05)), url(${background})`
                        : `linear-gradient(to bottom right, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(${background_dark})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: theme.palette.getContrastText(
                    theme.palette.background.default,
                ),
                px: theme.spacings.xs,
            })}
            className="HeroBanner-root"
        >
            {/* Content container */}
            <Box
                sx={(theme) => ({
                    width: "100%",
                    maxWidth: theme.maxWidth,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: theme.spacings.md,
                    p: { xs: theme.spacings.xs, md: theme.spacings.sm },
                    // subtle frosted glass box for readability on small screens
                    background:
                        theme.palette.mode === "light"
                            ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02))"
                            : "linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.24))",
                    borderRadius: 2,
                    backdropFilter: "blur(4px)",
                })}
            >
                <Typography
                    component="div"
                    variant="h6"
                    sx={(theme) => ({
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                    })}
                >
                    {role} — {sector} · {location}
                </Typography>

                <Typography
                    variant="h1"
                    sx={(theme) => ({
                        color: theme.palette.text.primary,
                        lineHeight: 1.02,
                        ...fontSize(36, 56),
                        fontVariationSettings: "'wght' 900",
                        fontWeight: 900,
                        // responsive max width for long names
                        maxWidth: { xs: "100%", md: "70%" },
                        transition: "transform 450ms ease, opacity 450ms ease",
                    })}
                >
                    {name}
                </Typography>

                <Typography
                    variant="h5"
                    sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        ...fontSize(16, 20),
                        maxWidth: { xs: "100%", md: "55%" },
                    })}
                >
                    {shortBio} <span aria-hidden="true">{dots}</span>
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        pt: 1,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => scrollTo(contactId)}
                        aria-label="Contact"
                        sx={(theme) => ({
                            boxShadow: theme.shadows[3],
                            textTransform: "none",
                        })}
                    >
                        Contact
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => scrollTo(aboutId)}
                        aria-label="About"
                        sx={(theme) => ({
                            color: theme.palette.text.primary,
                            borderColor: theme.palette.divider,
                            textTransform: "none",
                        })}
                    >
                        About
                    </Button>

                    <Button
                        variant="text"
                        size="large"
                        onClick={() => {
                            // Open email draft (quick shortcut)
                            window.location.href = `mailto:twayana@ayash.com`;
                        }}
                        sx={{ textTransform: "none" }}
                    >
                        Email
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
