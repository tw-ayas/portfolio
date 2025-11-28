import {
    Avatar,
    Box,
    Button,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { LinkWrap } from "../utils/LinkWrap";

export type ContentWrapperProps = {
    id: string;
    title: string;
    /**
     * Primary content for the right column. Usually a component or markup
     * describing the section (e.g. About, Contact form, Projects).
     */
    children: React.ReactNode;
    /**
     * Short subtitle or lead text shown under the title.
     */
    lead?: string;
    /**
     * Optional small avatar or illustrative image to show near the title.
     * Pass a URL string to render an `Avatar`.
     */
    avatarSrc?: string | null;
    /**
     * Optional list of call-to-action buttons to render under the title.
     * Each item is { label, href?, onClick? } - href takes precedence.
     */
    ctas?: Array<{
        label: string;
        href?: string;
        onClick?: (e: React.MouseEvent) => void;
        variant?: "text" | "outlined" | "contained";
    }>;
};

/**
 * ContentWrapper
 *
 * Modern, accessible two-column wrapper used for the portfolio pages sections.
 *
 * - Uses a semantic <section> with aria-labelledby for improved accessibility.
 * - Left column: title, optional avatar, lead text, CTAs.
 * - Right column: main content (children).
 * - Fully responsive: stacks on small screens, two columns on md+.
 */
export function ContentWrapper(props: ContentWrapperProps) {
    const { id, title, children, lead, avatarSrc = null, ctas = [] } = props;
    const theme = useTheme();

    const headingId = `${id}-title`;

    return (
        <Box
            component="section"
            id={id}
            aria-labelledby={headingId}
            role="region"
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                px: { xs: theme.spacings.xs, md: theme.spacings.sm },
                py: { xs: theme.spacings.md, md: theme.spacings.lg },
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: theme.maxWidth,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
                    gap: theme.spacings.sm,
                    alignItems: "start",
                    alignContent: "start",
                }}
            >
                {/* Left column: Title / Summary / CTAs */}
                <Box
                    component="header"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacings.sm,
                        position: "sticky",
                        top: {
                            xs: 0,
                            md: `calc(${theme.appShell.headerHeightMd} + 12px)`,
                        },
                        alignSelf: "start",
                        // keep left column visually separated on wide screens
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        {avatarSrc ? (
                            <Avatar
                                src={avatarSrc}
                                alt={`${title} avatar`}
                                sx={{ width: 64, height: 64 }}
                                imgProps={{ loading: "lazy" }}
                            />
                        ) : (
                            <Box
                                aria-hidden
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 1,
                                    background:
                                        theme.palette.mode === "light"
                                            ? theme.palette.primary.main
                                            : theme.palette.secondary.main,
                                }}
                            />
                        )}

                        <Typography
                            id={headingId}
                            component="h2"
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.05,
                                color: theme.palette.text.primary,
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>

                    {lead ? (
                        <Typography
                            component="p"
                            variant="body1"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {lead}
                        </Typography>
                    ) : null}

                    {ctas.length > 0 ? (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {ctas.map((cta, i) => {
                                const key = `cta-${id}-${i}`;
                                if (cta.href) {
                                    return (
                                        <LinkWrap href={cta.href} key={key}>
                                            <Button
                                                variant={
                                                    cta.variant ?? "contained"
                                                }
                                                size="small"
                                            >
                                                {cta.label}
                                            </Button>
                                        </LinkWrap>
                                    );
                                }
                                return (
                                    <Button
                                        key={key}
                                        onClick={cta.onClick}
                                        variant={cta.variant ?? "contained"}
                                        size="small"
                                    >
                                        {cta.label}
                                    </Button>
                                );
                            })}
                        </Stack>
                    ) : null}
                </Box>

                {/* Right column: Main content */}
                <Box
                    component="main"
                    sx={{
                        width: "100%",
                        display: "block",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: theme.spacings.xs, md: theme.spacings.sm },
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? "rgba(255,255,255,0.02)"
                                    : theme.palette.background.paper,
                            borderRadius: 2,
                            // subtle border on light mode for separation
                            border:
                                theme.palette.mode === "light"
                                    ? `1px solid ${theme.palette.divider}`
                                    : "none",
                            minHeight: 160,
                        }}
                        aria-labelledby={headingId}
                        tabIndex={-1}
                    >
                        {children}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default ContentWrapper;
