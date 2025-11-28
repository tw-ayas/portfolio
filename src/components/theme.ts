import { alpha, createTheme, Theme } from "@mui/material";
import { Components, PaletteOptions, Shadows } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { spreadVal } from "./spreadVal";

// https://material.io/design/environment/elevation.html#default-elevations

const shadows: Shadows = [
	/* 0 */ "none",
	/* 1 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 1.4px 1.8px -1.5px hsl(0deg 0% 0% / 0.09)`,
	/* 2 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 2.6px 3.3px -1.5px hsl(0deg 0% 0% / 0.09)`,
	/* 3 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 3.8px 4.8px -1.5px hsl(0deg 0% 0% / 0.09)`,
	/* 4 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.04),0px 1.7px 2.2px -0.7px hsl(0deg 0% 0% / 0.06),0px 5px 6.4px -1.5px hsl(0deg 0% 0% / 0.08)`,
	/* 5 */ "none",
	/* 6 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.04),0px 2.3px 2.9px -0.7px hsl(0deg 0% 0% / 0.06),0px 7.6px 9.7px -1.5px hsl(0deg 0% 0% / 0.08)`,
	/* 7 */ "none",
	/* 8 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 2.9px 3.7px -0.7px hsl(0deg 0% 0% / 0.07),0px 10px 12.8px -1.5px hsl(0deg 0% 0% / 0.1)`,
	/* 9 */ "none",
	/* 10 */ "none",
	/* 11 */ "none",
	/* 12 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 4.2px 5.4px -0.7px hsl(0deg 0% 0% / 0.09),0px 15px 19.1px -1.5px hsl(0deg 0% 0% / 0.11)`,
	/* 13 */ "none",
	/* 14 */ "none",
	/* 15 */ "none",
	/* 16 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 3.5px 4.5px -0.5px hsl(0deg 0% 0% / 0.07),0px 8.6px 11px -1px hsl(0deg 0% 0% / 0.08),0px 20px 25.5px -1.5px hsl(0deg 0% 0% / 0.1)`,
	/* 17 */ "none",
	/* 18 */ "none",
	/* 19 */ "none",
	/* 20 */ "none",
	/* 21 */ "none",
	/* 22 */ "none",
	/* 23 */ "none",
	/* 24 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 3.9px 5px -0.4px hsl(0deg 0% 0% / 0.07),0px 8.1px 10.3px -0.7px hsl(0deg 0% 0% / 0.08),0px 15.8px 20.1px -1.1px hsl(0deg 0% 0% / 0.1),0px 30px 38.3px -1.5px hsl(0deg 0% 0% / 0.11)`,
];

export const themeBaseDefaults = {
	breakpoints,
	spreadVal,
	shadows,
};

/**
 * This will create a css value that sizes based on the viewport width.
 *
 * E.g.: `responsiveVal(16, 22)` -> Will render 16px at 320px window width, 22 ad 1280 window width
 */
export function responsiveVal(
	min: number,
	max: number,
	maxBreakpoint = 1280,
): `max(${number}px, min(${string}, ${number}px))` {
	const round = (x: number, n: number): number =>
		Math.round(x * 10 ** n) / 10 ** n;

	const minBreakpoint = 320;
	const growth = (max - min) / (maxBreakpoint - minBreakpoint);
	const base = round(min - growth * minBreakpoint, 2);
	const vsize = round(growth * 100, 2);

	const calc = `(${base}px + ${vsize}vw)`;
	return `max(${min}px, min(${calc}, ${max}px))`;
}

export function breakpointVal(
	property: string,
	min: number,
	max: number,
	breakpointsObject: Record<string, number>,
) {
	const minSize = 320;
	const breakpointsList = Object.values(breakpointsObject);
	const spread = breakpointsList[breakpointsList.length - 1] - minSize;

	const entries: Record<string, string | Record<string, string>> = {};

	breakpointsList.forEach((breakpoint, index) => {
		// Get the size between this breakpoint and the previous breakpoint
		const between =
			(breakpoint + (breakpointsList[index + 1] ?? breakpoint)) / 2;
		// Calculate the size of the value
		const size = Math.max(
			min,
			((between - minSize) / spread) * (max - min) + min,
		);
		const value = `${Math.round(size * 100) / 100}px`;

		if (breakpoint) {
			entries[`@media (min-width: ${breakpoint}px )`] = {
				[property]: value,
			};
		} else {
			entries[property] = value;
		}
	});

	return entries;
}

export const fontSize = (from: number, to: number) =>
	breakpointVal("fontSize", from, to, themeBaseDefaults.breakpoints.values);

/**
 * Correct MUI module augmentation
 *
 * Merge all custom theme extensions into a single augmentation for
 * '@mui/material/styles'. Avoid augmenting internal paths like
 * '@mui/material/styles/createPalette' which may not be available to TypeScript.
 */
declare module "@mui/material/styles" {
	// Extend background type with our custom props
	interface TypeBackground {
		image: string;
		contrast: string;
	}

	// Extend ThemeOptions so createTheme accepts our custom fields
	interface ThemeOptions {
		spacings?: {
			xxs?: string;
			xs?: string;
			sm?: string;
			md?: string;
			lg?: string;
			xl?: string;
			xxl?: string;
		};
		page?: {
			horizontal?: string;
			vertical?: string;
		};
		appShell?: {
			headerHeightSm?: string;
			headerHeightMd?: string;
			appBarHeightSm?: string;
			appBarHeightMd?: string;
			appBarInnerHeightMd?: string;
			appBarInnerHeightSm?: string;
		};
		shape?: { borderRadius?: number };
		maxWidth?: string;
	}

	// Extend runtime Theme to include our custom fields
	interface Theme {
		spacings: {
			xxs: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xxl: string;
		};
		page: {
			horizontal: string;
			vertical: string;
		};
		appShell: {
			headerHeightSm: string;
			headerHeightMd: string;
			appBarHeightSm: string;
			appBarHeightMd: string;
			appBarInnerHeightMd: string;
			appBarInnerHeightSm: string;
		};
		shape: { borderRadius: number };
		maxWidth: string;
	}
}

const lightPalette: PaletteOptions = {
	mode: "light",
	primary: {
		main: "#2563eb", // Modern blue
		contrastText: "#ffffff",
	},
	secondary: {
		main: "#64748b", // Slate gray
		contrastText: "#ffffff",
	},
	background: {
		default: "#f8fafc", // Clean off-white
		paper: "#ffffff",
		contrast: "#d4a373", // Sky blue accent
	},
	divider: "#e2e8f0",
	success: {
		main: "#10b981",
		light: "#34d399",
	},
	action: {
		hoverOpacity: 0.08,
	},
	text: {
		primary: "#0f172a", // Deep slate
		secondary: "#64748b",
		disabled: "#cbd5e1",
	},
};

const darkPalette: PaletteOptions = {
	mode: "dark",
	primary: {
		main: "#fffcf2",
		contrastText: "#000000",
	},
	secondary: {
		main: "#ab9e88", // "#ccc5b9",
		contrastText: "#000000",
	},
	background: {
		default: "#403d39",
		paper: "#252422",
		contrast: "#eb5e28",
	},
	divider: "#ffffff30",
	success: {
		main: "#01D26A",
		light: "#01D26A",
	},
	action: {
		hoverOpacity: 0.16,
	},
	text: {
		primary: "#ffffff",
		secondary: "#ffffff80",
		disabled: "#ffffff30",
	},
};

const createThemeWithPalette = (palette: PaletteOptions) => {
	return createTheme({
		palette,
		...themeBaseDefaults,
		shape: { borderRadius: 3 },
		typography: {
			fontFamily: `'JetBrains Mono', 'Roboto', 'Pro Regular', -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji`,
			// @see docs typography.md
			h1: {
				...fontSize(36, 64),
				fontWeight: 660,
				fontVariationSettings: "'wght' 660",
				lineHeight: 1.22,
			},
			h2: {
				...fontSize(20, 36),
				fontWeight: 630,
				fontVariationSettings: "'wght' 630",
				lineHeight: 1.35,
			},
			h3: {
				...fontSize(18, 24),
				fontWeight: 660,
				fontVariationSettings: "'wght' 500",
				lineHeight: 1.55,
			},
			h4: {
				...fontSize(14, 20),
				fontWeight: 440,
				fontVariationSettings: "'wght' 440",
				lineHeight: 1.55,
			},
			h5: {
				...fontSize(13, 17),
				fontWeight: 400,
				fontVariationSettings: "'wght' 400",
				lineHeight: 1.55,
			},
			h6: {
				...fontSize(11, 16),
				fontWeight: 400,
				fontVariationSettings: "'wght' 400",
				lineHeight: 1.8,
			},
			fontWeightBold: 600,
			body1: {
				...fontSize(14, 18),
				lineHeight: 1.5,
			},
			subtitle1: {
				...fontSize(14, 16),
				fontWeight: 400,
				fontVariationSettings: "'wght' 400",
				lineHeight: 1.2,
			},
			body2: {
				...fontSize(12, 14),
				lineHeight: 1.5,
			},
			subtitle2: {
				...fontSize(10, 12),
				fontWeight: 400,
				fontVariationSettings: "'wght' 400",
				lineHeight: 1.2,
			},
			caption: {
				// https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
				...fontSize(10, 12),
			},
			button: {},
			overline: {
				// https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
				...fontSize(16, 20),
				fontWeight: 200,
				letterSpacing: 1,
				lineHeight: 1.2,
				textTransform: "uppercase",
				color: "#000000 !important",
			},
		},
		spacings: {
			xxs: responsiveVal(10, 16),
			xs: responsiveVal(12, 20),
			sm: responsiveVal(14, 30),
			md: responsiveVal(16, 50),
			lg: responsiveVal(24, 80),
			xl: responsiveVal(40, 100),
			xxl: responsiveVal(80, 160),
		},
		page: {
			horizontal: responsiveVal(15, 30),
			vertical: responsiveVal(15, 30),
		},
		appShell: {
			headerHeightSm: "70px",
			headerHeightMd: "70px",
			appBarHeightSm: "70px",
			appBarHeightMd: "70px",
			appBarInnerHeightSm: "70px",
			appBarInnerHeightMd: "70px",
		},
		maxWidth: "1560px",
	});
};

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components<Theme> => ({
	MuiCssBaseline: {
		styleOverrides: {
			body: {
				overflowY: "scroll",
			},
			"::selection": {
				background: alpha(theme.palette.primary.main, 0.6),
			},
			"::-moz-selection": {
				background: alpha(theme.palette.primary.main, 0.6),
			},
			"#__next": {
				position: "relative",
			},
			"picture img": {
				// filter: 'brightness(1.03)',
				willChange: "filter",
			},
		},
	},

	MuiTypography: {
		styleOverrides: {
			root: {
				color: theme.palette.text.primary,
			},
		},
	},

	// https://mui.com/material-ui/guides/routing/#global-theme-link
	// https://www.graphcommerce.org/docs/framework/links

	MuiContainer: {
		variants: [
			{
				props: { disableGutters: false },
				style: {
					paddingLeft: theme.page.horizontal,
					paddingRight: theme.page.horizontal,
					[theme.breakpoints.up("md")]: {
						paddingLeft: theme.page.horizontal,
						paddingRight: theme.page.horizontal,
					},
				},
			},
			{
				props: { disableGutters: true },
				style: {
					// padding: 0,
					// maxWidth: undefined,
				},
			},
		],
	},

	MuiInputBase: {
		styleOverrides: {
			root: {
				[theme.breakpoints.down("md")]: {
					fontSize: "16px", // https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/
				},
			},
		},
	},

	MuiButtonBase: {
		// styleOverrides: {
		// 		root: {
		// },
	},

	MuiButton: {
		defaultProps: { color: "inherit" },
		variants: [
			{
				props: { variant: "contained", color: "inherit" },
				style: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary },
			},
			{
				props: { variant: "outlined" },
				style: {
					...breakpointVal(
						"borderRadius",
						theme.shape.borderRadius * 2,
						theme.shape.borderRadius * 3,
						theme.breakpoints.values,
					),
				},
			},
			{
				props: { variant: "text" },
				style: { borderRadius: "99em" },
			},
			{
				props: { color: "primary" },
				style: {
					"&:not(.Mui-disabled)": {
						boxShadow: "none",
					},
				},
			},
			{
				props: { color: "secondary" },
				style: {
					"&:not(.Mui-disabled)": {
						boxShadow: "none",
					},
				},
			},
		],
	},

	MuiFab: {
		styleOverrides: {
			root: {
				"&.MuiFab-default": {
					backgroundColor: theme.palette.background.contrast,
					// "&:hover": {
					// backgroundColor: theme.palette.background.paper,
					// },
					color: theme.palette.text.primary,
				},
			},
			colorInherit: {
				backgroundColor: "inherit",
				"&:hover, &:focus": {
					backgroundColor: "inherit",
				},
				boxShadow: "none",
			},
			extended: {
				fontWeight: 400,
				textTransform: "none",
			},
		},
	},

	MuiTextField: {
		defaultProps: { color: "secondary" },
		styleOverrides: {
			root: {
				"& .MuiOutlinedInput-root": {
					...breakpointVal(
						"borderRadius",
						theme.shape.borderRadius * 1.5,
						theme.shape.borderRadius * 2,
						theme.breakpoints.values,
					),
				},
			},
		},
	},

	MuiListItem: {
		styleOverrides: {
			root: {
				display: `block`,
				padding: 0,
			},
		},
	},

	MuiListItemIcon: {
		styleOverrides: {
			root: {
				color: theme.palette.text.primary,
			},
		},
	},

	MuiCheckbox: {
		styleOverrides: {
			colorPrimary: {
				color: theme.palette.text.disabled,
				"&.Mui-checked": {
					color: theme.palette.primary.main,
				},
			},
			colorSecondary: {
				color: theme.palette.text.disabled,
				"&.Mui-checked": {
					color: theme.palette.secondary.main,
				},
			},
		},

		variants: [
			{
				props: { size: "medium" },
				style: {
					padding: 7,
				},
			},
		],
	},

	MuiSwitch: {
		styleOverrides: {
			thumb: {
				boxShadow: theme.shadows[6],
			},
		},
	},

	MuiAvatar: {
		styleOverrides: {
			colorDefault: {
				backgroundColor: theme.palette.text.disabled,
			},
			root: {},
		},
	},

	MuiCircularProgress: {
		defaultProps: {
			thickness: 2,
		},
	},
});

export const lightTheme = createThemeWithPalette(lightPalette);
lightTheme.components = createOverrides(lightTheme) as Components;

export const darkTheme = createThemeWithPalette(darkPalette);
darkTheme.components = createOverrides(darkTheme) as Components;
