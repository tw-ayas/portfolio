import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";

export function AboutContent() {
    return (
        <Box>
            <Typography paragraph>
                Hi — I&apos;m Ayash Twayana, a Software Engineer based in Munich
                specializing in high-performance e-commerce systems. I focus on
                building scalable applications with emphasis on optimization and
                clean architecture.
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                What I do
            </Typography>
            <Typography component="p">
                I develop backend and frontend solutions optimized for
                performance and scalability. My work spans system-level
                programming, cloud infrastructure, and production systems
                serving European markets.
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Core skills
            </Typography>
            <Stack
                sx={{ "& .MuiChip-root": { mb: 1 } }}
                direction="row"
                spacing={1}
                flexWrap="wrap"
            >
                <Chip label="React" size="small" />
                <Chip label="Vue" size="small" />
                <Chip label="Next.js" size="small" />
                <Chip label="Laravel" size="small" />
                <Chip label="Django" size="small" />
                <Chip label="Magento" size="small" />
                <Chip label="C" size="small" />
                <Chip label="System Programming" size="small" />
                <Chip label="Cloud" size="small" />
                <Chip label="Performance Optimization" size="small" />
            </Stack>

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Selected projects
            </Typography>

            <Grid container spacing={2}>
                <Grid>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700 }}
                        >
                            Scraping & Data Pipeline
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Built high-performance scraping tools for
                            large-scale data collection and processing,
                            optimized for memory efficiency and throughput.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700 }}
                        >
                            Dynamic Repricing System
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Developed automated repricing tools for competitive
                            market positioning across European e-commerce
                            platforms.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
