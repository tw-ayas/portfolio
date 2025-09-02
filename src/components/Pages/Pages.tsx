import {
    Box,
    Button,
    Chip,
    Grid,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { ContentWrapperProps } from "./ContentWrapper";

/**
 * Updated Pages list for Ayash Twayana's portfolio.
 *
 * - About: concise bio, skills, highlights and sample projects
 * - Contact: contact information + quick contact form (no backend)
 *
 * You can edit the text below directly to update the content shown on the site.
 */

/* ---------- About section content (inline) ---------- */
const AboutContent = (
    <Box>
        <Typography paragraph>
            Hi — I&apos;m Ayash Twayana, a Software Engineer based in Munich. I
            primarily work in the ecommerce sector, building performant,
            accessible and maintainable ecommerce platforms and consumer-facing
            applications.
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            What I do
        </Typography>
        <Typography paragraph>
            I design and implement frontend-first solutions with a focus on
            scalable architectures, reliable integrations and great user
            experiences. I enjoy collaborating with product teams to ship
            features that move business metrics and are delightful to use.
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Core skills
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="React" size="small" />
            <Chip label="TypeScript" size="small" />
            <Chip label="Next.js" size="small" />
            <Chip label="MUI" size="small" />
            <Chip label="Node.js" size="small" />
            <Chip label="eCommerce" size="small" />
            <Chip label="Performance" size="small" />
            <Chip label="Testing" size="small" />
            <Chip label="Docker" size="small" />
        </Stack>

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Selected projects
        </Typography>

        <Grid container spacing={2}>
            <Grid>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Headless Storefront
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Implemented a headless storefront using React + Next.js
                        with performant server-side rendering, image
                        optimization and seamless payment integration.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <Link href="#" target="_blank" rel="noreferrer">
                            Case study →
                        </Link>
                    </Typography>
                </Paper>
            </Grid>

            <Grid>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Omnichannel Checkout
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Delivered an omnichannel checkout solution with robust
                        carts, discounting and order orchestration across web
                        and mobile clients.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <Link href="#" target="_blank" rel="noreferrer">
                            Overview →
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </Box>
);

/* ---------- Contact section content (inline, simple form) ---------- */
function ContactContent() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Client-side only: replace with your API endpoint or mailto handler.
        const fd = new FormData(e.currentTarget);
        const payload = {
            name: fd.get("name"),
            email: fd.get("email"),
            message: fd.get("message"),
        };
        // eslint-disable-next-line no-console
        console.log("Contact form submitted:", payload);
        // Show a basic success hint (could be improved)
        // In this project we avoid local state for simplicity; you can add snackbar/toast here.
    };
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography paragraph>
                Feel free to reach out for collaborations, consulting or just to
                say hi.
            </Typography>

            <Grid container spacing={2}>
                <Grid>
                    <TextField
                        name="name"
                        label="Your name"
                        fullWidth
                        required
                    />
                    <TextField
                        name="email"
                        label="Email address"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        name="message"
                        label="Message"
                        rows={6}
                        multiline
                        fullWidth
                        required
                    />
                </Grid>
                <Grid>
                    <Stack direction="row" spacing={2}>
                        <Button type="submit" variant="contained">
                            Send message
                        </Button>
                        <Button
                            variant="outlined"
                            href="mailto:twayana@ayash.dev"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Or Email me
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            {/* Fallback contact details */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Email:{" "}
                    <Link href="mailto:hello@ayash.dev" underline="hover">
                        twayana@ayash.dev
                    </Link>
                    {" — "}
                    Location: Munich, Germany
                </Typography>
            </Box>
        </Box>
    );
}

/* ---------- Pages definitions ---------- */
const AboutMe: ContentWrapperProps = {
    id: "about",
    title: "About",
    lead: "Software Engineer — ecommerce & frontend specialist based in Munich",
    avatarSrc: null,
    ctas: [
        { label: "Download CV", href: "/resume.pdf", variant: "outlined" },
        { label: "Contact", href: "#contact", variant: "contained" },
    ],
    children: AboutContent,
};

const ContactMe: ContentWrapperProps = {
    id: "contact",
    title: "Contact",
    lead: "Get in touch for work, consulting or speaking opportunities",
    children: <ContactContent />,
};

/* Keep the export shape compatible with the rest of the application */
export const Pages: ContentWrapperProps[] = [AboutMe, ContactMe];

export default Pages;
