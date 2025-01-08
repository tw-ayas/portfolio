import { Box, Typography } from "@mui/material";
import React from "react";

export type ContentWrapperProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function ContentWrapper(props: ContentWrapperProps) {
  const { id, title, children } = props;
  return (
    <Box>
      <Box
        sx={(theme) => ({
          p: theme.spacings.xs,
          paddingTop: theme.spacings.lg,
          height: "fill-available",
          maxWidth: theme.maxWidth,
          display: "flex",
          margin: "0 auto",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
            justifyContent: "space-between",
            p: theme.spacings.sm,
            alignItems: "center",
            gap:theme.spacings.sm,
          },
        })}
        id={id}
      >
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            // width: "30dvw",
            flexGrow: "1",
            flexShrink: "1",
						fontSize: "clamp(1rem 2.5vw 2rem)",
						[theme.breakpoints.up("md")]:{
							width:"30dvw"
						},
          })}
        >
          {title}
        </Typography>
        <Box
          sx={{
            height: "100%",
            // backgroundColor: "slateblue",
            width: "100%",
            flexGrow: "1",
            flexShrink: "1",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
