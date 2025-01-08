import { Box, Button, TextField } from "@mui/material";

const Contact = () => {
	return (
		<>
			{/* <Container style={{ width: "100%", height: "100%" }}>
        <div style={{ color: "white" }}>Contact</div> */}
			<Box
				sx={(theme) => ({
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: theme.spacings.sm,
					height: "100%",
					// backgroundColor: "slateblue",
				})}
			>
				<TextField
					sx={(theme) => ({
						// background: "white",
						// height:"100px",
						width: { xs: "80%", md: "60%" },
					})}
					label="Name"
					size="medium"
					variant="outlined"
				/>
				<TextField
					sx={(theme) => ({
						// background: "white",
						// height:"100px",
						width: { xs: "80%", md: "60%" },
					})}
					// id="outlined-basic"
					label="Email"
					variant="outlined"
				/>
				<TextField
					sx={(theme) => ({
						// background: "white",
						// height:"100px",
						width: { xs: "80%", md: "60%" },
						// minHeight: "100px",
					})}
					// id="outlined-basic"
					label="Message"
					variant="outlined"
					InputProps={{
						rows: 6,
						multiline: true,
						inputComponent: "textarea",
					}}
				/>
				<Button variant="contained" color="primary" size="large">
					Send
				</Button>
			</Box>

			{/* </Container> */}
		</>
	);
};

export default Contact;
