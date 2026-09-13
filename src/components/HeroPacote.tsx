import { useEffect } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

/**
 * A peça do primeiro viewport: a imagem do produto entrando em cena.
 *
 * Prancha de projeto na entrada, o produto surge de fora de foco e sobe, fica
 * respirando, e acompanha o cursor girando de leve em perspectiva. Nada é
 * sobreposto à imagem: a arte do pacote é a da própria peça.
 */

const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
	src: string
	width: number
	height: number
}

export default function HeroPacote({ src, width, height }: Props) {
	const reduced = useReducedMotion()

	const px = useMotionValue(0)
	const py = useMotionValue(0)
	const rotY = useSpring(useTransform(px, [-1, 1], [7, -7]), { stiffness: 55, damping: 18 })
	const rotX = useSpring(useTransform(py, [-1, 1], [-4, 4]), { stiffness: 55, damping: 18 })

	useEffect(() => {
		if (reduced) return
		const onMove = (e: PointerEvent) => {
			px.set((e.clientX / window.innerWidth) * 2 - 1)
			py.set((e.clientY / window.innerHeight) * 2 - 1)
		}
		window.addEventListener("pointermove", onMove, { passive: true })
		return () => window.removeEventListener("pointermove", onMove)
	}, [px, py, reduced])

	const t = (delay: number, duration: number) =>
		reduced ? { duration: 0 } : { duration, delay, ease: EASE }

	return (
		<motion.div
			className="relative w-full"
			style={{ perspective: 1400, rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY }}
		>
			{/* prancha de projeto: entra antes do produto e recua quando ele chega */}
			<motion.svg
				viewBox="0 0 100 140"
				preserveAspectRatio="none"
				className="absolute inset-0 -z-10 h-full w-full"
				initial="hidden"
				animate="shown"
				aria-hidden="true"
			>
				<motion.g
					stroke="#8A6D50"
					strokeWidth="0.22"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: [0, 0.72, 0.72, 0.16], transition: t(0, 3.6) } }}
				>
					<motion.line
						x1="50"
						y1="2"
						x2="50"
						y2="138"
						strokeDasharray="1.4 2"
						variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.1, 0.9) } }}
					/>
					<motion.line
						x1="4"
						y1="12"
						x2="96"
						y2="12"
						strokeDasharray="1.4 2"
						variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.3, 0.7) } }}
					/>
					<motion.line
						x1="4"
						y1="129"
						x2="96"
						y2="129"
						strokeDasharray="1.4 2"
						variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.45, 0.7) } }}
					/>
					<motion.g variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(0.6, 0.5) } }}>
						<line x1="8" y1="12" x2="8" y2="129" />
						<line x1="6" y1="12" x2="10" y2="12" />
						<line x1="6" y1="129" x2="10" y2="129" />
					</motion.g>
				</motion.g>
			</motion.svg>

			{/* o produto: sobe e entra em foco */}
			<motion.div
				className="relative w-full"
				initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 1.3, delay: 1.1, ease: EASE }}
			>
				<motion.div
					className="relative mx-auto aspect-[1468/2310] w-full max-w-[26rem] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-lift-3)] sm:rounded-[2rem]"
					animate={reduced ? undefined : { y: [0, -8, 0] }}
					transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
				>
					<img
						src={src}
						width={width}
						height={height}
						alt="Pacote de café private label com a etiqueta livre para a marca do cliente"
						className="absolute inset-0 h-full w-full object-cover"
						loading="eager"
						fetchPriority="high"
					/>

				</motion.div>
			</motion.div>
		</motion.div>
	)
}
