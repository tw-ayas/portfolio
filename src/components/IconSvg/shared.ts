import { responsiveVal as rv } from "../theme"

export const sizes = {
  xs: rv(11, 12),
  small: rv(12, 15),
  medium: rv(22, 23),
  large: rv(24, 26),
  xl: rv(38, 62),
  xxl: rv(96, 148),
} as const

export function useIconSvgSize(size: keyof typeof sizes) {
  return sizes[size]
}

export function svgIconStrokeWidth(
  lowSize: number,
  highSize: number,
  lowStroke: number,
  highStroke: number,
) {
  const val = `calc(${lowStroke}px - ((1em - ${lowSize}px) / (${highSize} - ${lowSize}) * (${lowStroke} - ${highStroke})))`
  return val
}