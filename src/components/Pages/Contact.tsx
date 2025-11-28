import {
    Box,
    Button,
    Grid,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export function ContactContent() {
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
            <Typography component="p" sx={{mb:2}}>
                Feel free to reach out for collaborations, consulting or just to
                say hi.
            </Typography>

            <Grid container spacing={2}>
                <Grid container spacing={2}>
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
