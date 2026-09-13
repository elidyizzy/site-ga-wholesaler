import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

/**
 * O pacote private label no primeiro viewport — imagem real, etiqueta ao vivo.
 *
 * A imagem é peça do próprio cliente (recorte de `apresentação private label.pdf`,
 * onde o pacote já aparece com a etiqueta em branco). Desenhar isso em SVG não
 * alcançava: material, textura de kraft e profundidade de campo não se resolvem
 * com gradiente linear.
 *
 * O que é nosso, e é o argumento do site:
 *
 * 1. **A etiqueta troca de marca ao vivo**, ancorada em cima da etiqueta real do
 *    pacote — que na peça original tem o texto mal renderizado. Mesma estrutura,
 *    marca diferente: private label demonstrado, não explicado.
 * 2. **A revelação**: prancha de projeto → o pacote surge → a etiqueta assenta.
 * 3. **O pacote acompanha o cursor**, girando de leve em perspectiva.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const MARCAS = [
	{ nome: "SERRA ALTA", origem: "SUL DE MINAS", torra: "MÉDIA", peso: "250G" },
	{ nome: "SUA MARCA", origem: "VOCÊ ESCOLHE", torra: "A DEFINIR", peso: "250G" },
	{ nome: "CASA VERDE", origem: "CERRADO", torra: "ESCURA", peso: "500G" },
]

/** Posição da etiqueta real dentro da imagem, em % — medida sobre o recorte. */
const ETIQUETA = { left: "16.2%", top: "38.4%", width: "46.4%", height: "44.8%" }

interface Props {
	src: string
	width: number
	height: number
}

export default function HeroPacote({ src, width, height }: Props) {
	const reduced = useReducedMotion()
	const [marca, setMarca] = useState(0)

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

	// a marca só começa a girar depois que o pacote terminou de entrar
	useEffect(() => {
		let intervalo: ReturnType<typeof setInterval>
		const inicio = setTimeout(() => {
			setMarca((m) => (m + 1) % MARCAS.length)
			intervalo = setInterval(() => setMarca((m) => (m + 1) % MARCAS.length), 3600)
		}, 4200)
		return () => {
			clearTimeout(inicio)
			clearInterval(intervalo)
		}
	}, [])

	const t = (delay: number, duration: number) =>
		reduced ? { duration: 0 } : { duration, delay, ease: EASE }

	const m = MARCAS[marca]

	return (
		<motion.div
			className="relative h-full w-full"
			style={{ perspective: 1400, rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY }}
		>
			{/* prancha de projeto: entra antes do produto e recua quando ele chega */}
			<motion.svg
				viewBox="0 0 100 140"
				preserveAspectRatio="none"
				className="absolute inset-0 h-full w-full"
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
				className="relative h-full w-full"
				initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 1.3, delay: 1.1, ease: EASE }}
			>
				<motion.div
					className="relative mx-auto aspect-[1468/2310] h-full max-h-full overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift-3)]"
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

					{/* a etiqueta ao vivo, ancorada sobre a etiqueta real do pacote */}
					<motion.div
						className="absolute"
						style={ETIQUETA}
						initial={reduced ? false : { opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 2.4, ease: EASE }}
					>
						<div className="flex h-full w-full flex-col justify-between rounded-[3px] bg-[#FBF7EE] px-[7%] py-[6%] shadow-[inset_0_0_18px_rgba(120,96,62,0.16)]">
							<motion.div
								key={marca}
								initial={reduced ? false : { opacity: 0, y: 7 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: EASE }}
								className="flex h-full flex-col"
							>
								<p className="text-[clamp(6px,0.62vw,10px)] tracking-[0.22em] text-primary">PRIVATE LABEL</p>
								<p className="mt-[2%] text-[clamp(15px,1.75vw,30px)] leading-none font-semibold tracking-[-0.02em] text-foreground">
									{m.nome}
								</p>

								<div className="mt-auto border-t border-primary/25 pt-[5%]">
									<div className="grid grid-cols-2 gap-x-[6%] gap-y-[3%]">
										<div>
											<p className="text-[clamp(5px,0.5vw,8px)] tracking-[0.16em] text-muted-foreground/70">ORIGEM</p>
											<p className="text-[clamp(7px,0.72vw,12px)] text-foreground/85">{m.origem}</p>
										</div>
										<div>
											<p className="text-[clamp(5px,0.5vw,8px)] tracking-[0.16em] text-muted-foreground/70">TORRA</p>
											<p className="text-[clamp(7px,0.72vw,12px)] text-foreground/85">{m.torra}</p>
										</div>
										<div>
											<p className="text-[clamp(5px,0.5vw,8px)] tracking-[0.16em] text-muted-foreground/70">PESO</p>
											<p className="text-[clamp(7px,0.72vw,12px)] text-foreground/85">{m.peso}</p>
										</div>
										<div>
											<p className="text-[clamp(5px,0.5vw,8px)] tracking-[0.16em] text-muted-foreground/70">PRODUÇÃO</p>
											<p className="text-[clamp(7px,0.72vw,12px)] text-foreground/85">GA FOOD</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}
