// HeroBanner.js
import { Box, Typography } from "@mui/material";
import { fontSize } from "../theme";
import background_dark from "./backgrounds/background-dark.jpeg";
import background from "./backgrounds/background.jpg";
import { useEffect, useState } from "react";

export default function HeroBanner() {
	const [dots, setDots] = useState<"" | "." | ".." | "...">("")
	useEffect(() => { 
		const timeInterval = setInterval(() => {
			setDots((prev) => {
				switch (prev) {
					case "":
						return ".";
					case ".":
						return "..";
					case "..":
						return "...";
					case "...":
						return "";
				}
			})
		}, 1000)
		return () => {
			clearInterval(timeInterval)
		}
	})
	
	return (
		<Box
			sx={(theme) => ({
				backgroundImage:
					theme.palette.mode === "light"
						? `url(${background})`
						: `url(${background_dark})`,
				// backgroundPosition: theme.palette.mode === "light" ? "0% 0%" : "100% 0%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			})}
			className="Herobanner-root"
		>
			<Box
				sx={() => ({
					textAlign: "center",
					// position: 'absolute',
					// left: '5%',
					// right: '5%',
					// top: '30%',
					// color: 'white',
					// zIndex: 0,
					// [theme.breakpoints.up('md')]: {

					// top: '30%',
					// left: '20%',
					// right: '20%',
					// }
				})}
				className="Herobanner-content"
			>
				<Typography
					variant="h1"
					sx={(theme) => ({
						WebkitTextStroke:
							theme.palette.mode === "light"
								? { xs: "2px #000", md: "3px #000" }
								: { xs: "2px #fff", md: "3px #fff" },
						WebkitTextFillColor:
							theme.palette.mode === "light"
								? "#ffffffb0"
								: "#000000b0",
						...fontSize(48, 96),
						fontVariationSettings: "'wght' 900",
						fontWeight: 900,
					})}
				>
					{`Transforming Ideas into Seamless Web Experiences${dots}${'\xa0'.repeat(3 - dots.length)}`}
				</Typography>
				{/* <Box>Some text about the heo banner...</Box> */}
			</Box>
			{/* <Box
                sx={{height: '100%'}}
                className="hero-image"
            >
                <Box
                	draggable={false}
                    component='img'
                    sx={(theme) => ({
                        // maxWidth: '100%',
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto',
                        [theme.breakpoints.down('md')]: {
                            objectPosition: '30% 50%',
                        }
                    })}
                    src='/assets/background.jpg'
                    alt="Person"
                />
            </Box> */}
		</Box>
	);
}
