import { styled } from "@mui/material"
import { forwardRef } from "react"
import { sizes, svgIconStrokeWidth } from "./shared"

const Svg = styled('svg', { name: "IconSvg", target: "IconSvg" })(() => ({
  userSelect: 'none',
  width: '1.5rem',
  height: '1.5rem',
  display: 'inline-block',
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  strokeMiterlimit: 4,
  fill: 'none',
  fontSize: '1.3em',
  strokeWidth: svgIconStrokeWidth(28, 148, 1.4, 0.8),

  '&.sizeXs': { fontSize: sizes.xs },
  '&.sizeSmall': { fontSize: sizes.small },
  '&.sizeMedium': { fontSize: sizes.medium },
  '&.sizeLarge': { fontSize: sizes.large },
  '&.sizeXl': { fontSize: sizes.xl },
  '&.sizeXxl': { fontSize: sizes.xxl },

  '&.fillIcon': {
    fill: 'currentColor',
    stroke: 'none',
  },
}))

interface StaticImageData {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

interface StaticRequire {
  default: StaticImageData
}

type StaticImport = StaticRequire | StaticImageData

type IconSvgProps = {
	src: StaticImport | string
}

// function isStaticRequire(src: StaticRequire | StaticImageData): src is StaticRequire {
//   return (src as StaticRequire).default !== undefined
// }

// function isStaticImageData(src: StaticRequire | StaticImageData): src is StaticImageData {
//   return (src as StaticImageData).src !== undefined
// }

// function isStaticImport(src: string | StaticImport): src is StaticImport {
//   return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src))
// }

// function srcToString(src: StaticImport | string) {
//   return isStaticImport(src) ? (isStaticRequire(src) ? src.default : src).src : src
// }

export const IconSvg= forwardRef<SVGSVGElement, IconSvgProps>((props, ref) => {
	const {src, ...svgProps} = props
	return (
		<Svg
			ref={ref}
			aria-hidden='true'
			// className={`${classes.root} ${className ?? ''}`}
			{...svgProps}
		>
			<use href={`${src}#icon`} />
		</Svg>
	)
})