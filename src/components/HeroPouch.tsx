import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

/**
 * A ideia virando produto, no primeiro viewport.
 *
 * Pacote de café kraft brasileiro em 3/4, construído ao vivo. Três coisas
 * sustentam a peça:
 *
 * 1. **Volume por sombreamento, não por polígono.** A face carrega gradiente de
 *    luz, a dobra do gusset e o escurecimento do pé; sem isso o pacote lê como
 *    caixa chapada — que foi o defeito da versão anterior.
 * 2. **A etiqueta troca de marca.** O mesmo pacote assume marcas diferentes a
 *    cada poucos segundos, com a ficha técnica mudando junto. É literalmente o
 *    que private label é: a estrutura é a mesma, a marca é sua.
 * 3. **O pacote acompanha o cursor**, girando de leve em perspectiva.
 *
 * E nada aparece pronto: prancha de projeto → contorno → volume → galho →
 * etiqueta → grãos.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const MARCAS = [
	{ nome: "SERRA ALTA", origem: "SUL DE MINAS", torra: "MÉDIA", peso: "250G" },
	{ nome: "SUA MARCA", origem: "VOCÊ ESCOLHE", torra: "A DEFINIR", peso: "250G" },
	{ nome: "CASA VERDE", origem: "CERRADO", torra: "ESCURA", peso: "500G" },
]

const GRAOS = [
	{ x: 58, y: 156, r: 15, rot: -24, delay: 4.0, drift: -9 },
	{ x: 386, y: 104, r: 20, rot: 32, delay: 4.12, drift: 12 },
	{ x: 410, y: 306, r: 13, rot: -12, delay: 4.24, drift: -7 },
	{ x: 40, y: 360, r: 17, rot: 44, delay: 4.34, drift: 10 },
	{ x: 356, y: 512, r: 12, rot: -38, delay: 4.46, drift: -8 },
	{ x: 86, y: 528, r: 15, rot: 18, delay: 4.56, drift: 9 },
]

const FACE = "M126 186 306 150l14 366-180 34z"

export default function HeroPouch() {
	const reduced = useReducedMotion()
	const [marca, setMarca] = useState(0)

	// rotação que acompanha o cursor, amortecida pra nunca parecer nervosa
	const px = useMotionValue(0)
	const py = useMotionValue(0)
	const rotY = useSpring(useTransform(px, [-1, 1], [8, -8]), { stiffness: 55, damping: 18 })
	const rotX = useSpring(useTransform(py, [-1, 1], [-5, 5]), { stiffness: 55, damping: 18 })

	useEffect(() => {
		if (reduced) return
		const onMove = (e: PointerEvent) => {
			px.set((e.clientX / window.innerWidth) * 2 - 1)
			py.set((e.clientY / window.innerHeight) * 2 - 1)
		}
		window.addEventListener("pointermove", onMove, { passive: true })
		return () => window.removeEventListener("pointermove", onMove)
	}, [px, py, reduced])

	// a marca só começa a trocar depois que o pacote terminou de se construir
	useEffect(() => {
		let intervalo: ReturnType<typeof setInterval>
		const inicio = setTimeout(() => {
			setMarca((m) => (m + 1) % MARCAS.length)
			intervalo = setInterval(() => setMarca((m) => (m + 1) % MARCAS.length), 3600)
		}, 5600)

		return () => {
			clearTimeout(inicio)
			clearInterval(intervalo)
		}
	}, [])

	const t = (delay: number, duration: number) =>
		reduced ? { duration: 0 } : { duration, delay, ease: EASE }

	const draw = (delay: number, duration: number) => ({
		hidden: { pathLength: 0, opacity: 0 },
		shown: {
			pathLength: 1,
			opacity: 1,
			transition: { pathLength: t(delay, duration), opacity: { duration: 0.01, delay } },
		},
	})

	const fade = (delay: number, duration = 0.8, y = 10) => ({
		hidden: { opacity: 0, y },
		shown: { opacity: 1, y: 0, transition: t(delay, duration) },
	})

	const m = MARCAS[marca]

	return (
		<motion.div
			className="h-full w-full"
			style={{ perspective: 1300, rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY }}
		>
			<motion.svg
				viewBox="0 0 460 620"
				fill="none"
				className="h-full w-full"
				initial="hidden"
				animate="shown"
				aria-hidden="true"
				focusable="false"
			>
				<defs>
					{/* volume da face: luz na esquerda alta, sombra descendo à direita */}
					<linearGradient id="face-base" x1="4%" y1="2%" x2="98%" y2="96%">
						<stop offset="0%" stopColor="#FBF2E2" />
						<stop offset="26%" stopColor="#F0E1C7" />
						<stop offset="62%" stopColor="#E3CEAC" />
						<stop offset="100%" stopColor="#CBB088" />
					</linearGradient>
					{/* sombra que corre junto à dobra do gusset esquerdo */}
					<linearGradient id="face-gusset" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#9C7E59" stopOpacity="0.5" />
						<stop offset="36%" stopColor="#9C7E59" stopOpacity="0.1" />
						<stop offset="100%" stopColor="#9C7E59" stopOpacity="0" />
					</linearGradient>
					{/* o pacote assenta: a base recebe sombra */}
					<linearGradient id="face-foot" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#8A6D50" stopOpacity="0" />
						<stop offset="72%" stopColor="#8A6D50" stopOpacity="0.1" />
						<stop offset="100%" stopColor="#6E543B" stopOpacity="0.36" />
					</linearGradient>
					<linearGradient id="side-base" x1="0%" y1="0%" x2="100%" y2="20%">
						<stop offset="0%" stopColor="#C0A47C" />
						<stop offset="40%" stopColor="#A98963" />
						<stop offset="100%" stopColor="#8A6D50" />
					</linearGradient>
					<linearGradient id="top-base" x1="0%" y1="0%" x2="70%" y2="100%">
						<stop offset="0%" stopColor="#D9C3A0" />
						<stop offset="55%" stopColor="#C0A67F" />
						<stop offset="100%" stopColor="#9C7E59" />
					</linearGradient>
					<linearGradient id="seal-band" x1="0%" y1="0%" x2="80%" y2="100%">
						<stop offset="0%" stopColor="#C4A67F" />
						<stop offset="52%" stopColor="#A98963" />
						<stop offset="100%" stopColor="#87683F" />
					</linearGradient>
					<linearGradient id="bean-body" x1="20%" y1="0%" x2="90%" y2="100%">
						<stop offset="0%" stopColor="#7A5735" />
						<stop offset="55%" stopColor="#4E3820" />
						<stop offset="100%" stopColor="#32220F" />
					</linearGradient>
					<radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#211D18" stopOpacity="0.34" />
						<stop offset="100%" stopColor="#211D18" stopOpacity="0" />
					</radialGradient>
					<clipPath id="face-clip">
						<path d={FACE} />
					</clipPath>
				</defs>

				{/* 1 — prancha de projeto */}
				<motion.g
					stroke="#8A6D50"
					strokeWidth="1"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: [0, 0.7, 0.7, 0.13], transition: t(0, 4.2) } }}
				>
					<motion.line x1="230" y1="66" x2="230" y2="580" strokeDasharray="5 7" variants={draw(0.1, 0.9)} />
					<motion.line x1="64" y1="146" x2="404" y2="146" strokeDasharray="5 7" variants={draw(0.3, 0.7)} />
					<motion.line x1="64" y1="552" x2="404" y2="552" strokeDasharray="5 7" variants={draw(0.45, 0.7)} />
					<motion.g variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(0.6, 0.5) } }}>
						<line x1="80" y1="146" x2="80" y2="552" />
						<line x1="74" y1="146" x2="86" y2="146" />
						<line x1="74" y1="552" x2="86" y2="552" />
					</motion.g>
				</motion.g>

				<motion.ellipse
					cx="238"
					cy="560"
					rx="140"
					ry="19"
					fill="url(#floor-shadow)"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.2, 0.9) } }}
				/>

				<motion.g
					animate={reduced ? undefined : { y: [0, -8, 0] }}
					transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 5 }}
				>
					{/* 3 — volume */}
					<motion.path d={FACE} fill="url(#face-base)" variants={fade(1.5, 1, 16)} />
					<motion.path d="M306 150l44 24 10 330-44 12z" fill="url(#side-base)" variants={fade(1.62, 1, 16)} />
					<motion.path d="M126 186 306 150l44 24-180 38z" fill="url(#top-base)" variants={fade(1.74, 1, 16)} />
					{/* aba selada sobre o topo — é assim que o pacote fecha */}
					<motion.g variants={fade(1.86, 0.9, 14)}>
						<path d="M132 189 304 155l34 19-172 36z" fill="url(#seal-band)" />
						<g stroke="#6E543B" strokeOpacity="0.42" strokeWidth="1.2">
							<path d="M140 190 306 158" />
							<path d="M147 195 312 163" />
							<path d="M154 200 318 168" />
						</g>
					</motion.g>

					{/* o sombreamento que dá corpo: dobra do gusset, pé do pacote, quinas */}
					<motion.g
						clipPath="url(#face-clip)"
						variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.05, 1) } }}
					>
						<path d={FACE} fill="url(#face-foot)" />
						<rect x="126" y="140" width="48" height="420" fill="url(#face-gusset)" />
						<path d="M170 180 184 516" stroke="#9C7E59" strokeOpacity="0.28" strokeWidth="1.4" />
						<path d="M286 154 300 514" stroke="#9C7E59" strokeOpacity="0.18" strokeWidth="1.2" />
					</motion.g>

					{/* vincos da selagem, acompanhando a aresta do topo */}
					<motion.g
						stroke="#A98963"
						strokeOpacity="0.5"
						strokeWidth="1.5"
						variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.35, 0.6) } }}
					>
						<path d="M134 200 310 165" />
						<path d="M137 212 312 177" />
						<path d="M140 224 314 189" />
					</motion.g>

					{/* 2 — contorno se desenha */}
					<motion.g stroke="#8A6D50" strokeWidth="2" strokeLinejoin="round">
						<motion.path d={FACE} variants={draw(0.75, 1.4)} />
						<motion.path d="M306 150l44 24 10 330-44 12" variants={draw(1.05, 1)} />
						<motion.path d="M126 186 306 150l44 24" variants={draw(1.25, 0.8)} />
					</motion.g>

					<g clipPath="url(#face-clip)">
						{/* 4 — galho de café em line art */}
						<g stroke="#8A6D50" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.42">
							<motion.path d="M158 292q48-28 104-36t68 2" strokeWidth="1.6" variants={draw(2.55, 1)} />
							<motion.path d="M196 282q-16-22-4-40 20 12 16 36" strokeWidth="1.3" variants={draw(2.78, 0.5)} />
							<motion.path d="M196 282q20-18 38-12-12 20-36 16" strokeWidth="1.3" variants={draw(2.86, 0.5)} />
							<motion.path d="M246 272q-16-22-4-40 20 12 16 36" strokeWidth="1.3" variants={draw(2.96, 0.5)} />
							<motion.path d="M246 272q20-18 38-12-12 20-36 16" strokeWidth="1.3" variants={draw(3.04, 0.5)} />
							<motion.path d="M220 302q16 22 4 40-20-12-16-36" strokeWidth="1.3" variants={draw(3.14, 0.5)} />
							<motion.path d="M272 292q16 22 4 40-20-12-16-36" strokeWidth="1.3" variants={draw(3.24, 0.5)} />
							<motion.circle cx="306" cy="286" r="6.5" strokeWidth="1.3" variants={draw(3.36, 0.4)} />
							<motion.circle cx="318" cy="300" r="4.5" strokeWidth="1.3" variants={draw(3.44, 0.4)} />
						</g>

						{/* 5 — a etiqueta, e a marca que troca dentro dela */}
						<motion.g variants={fade(3.6, 0.7, 14)}>
							<path d="M150 350 300 320l7 108-150 30z" fill="#FCF8EF" fillOpacity="0.97" />
							<path d="M150 350 300 320l7 108-150 30z" stroke="#8A6D50" strokeOpacity="0.4" strokeWidth="1.5" />

							<motion.g
								key={marca}
								initial={reduced ? false : { opacity: 0, y: 9 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, ease: EASE }}
							>
								<text
									x="164"
									y="371"
									transform="rotate(-11.4 164 371)"
									fill="#8A6D50"
									fontSize="6.6"
									letterSpacing="1.5"
									fontFamily="'Geist Variable', system-ui, sans-serif"
								>
									PRIVATE LABEL
								</text>
								<text
									x="164"
									y="393"
									transform="rotate(-11.4 164 393)"
									fill="#2E2117"
									fontSize="19"
									fontWeight="600"
									letterSpacing="-0.4"
									fontFamily="'Geist Variable', system-ui, sans-serif"
								>
									{m.nome}
								</text>
								<path d="M157 403 303 374" stroke="#8A6D50" strokeOpacity="0.3" strokeWidth="1.1" />
								<g fontFamily="'Geist Variable', system-ui, sans-serif" letterSpacing="0.4">
									<text x="163" y="414" transform="rotate(-11.4 163 414)" fill="#A2988A" fontSize="5.4">
										ORIGEM
									</text>
									<text x="163" y="424" transform="rotate(-11.4 163 424)" fill="#4A4238" fontSize="7">
										{m.origem}
									</text>
									<text x="236" y="400" transform="rotate(-11.4 236 400)" fill="#A2988A" fontSize="5.4">
										TORRA
									</text>
									<text x="236" y="410" transform="rotate(-11.4 236 410)" fill="#4A4238" fontSize="7">
										{m.torra}
									</text>
									<text x="236" y="424" transform="rotate(-11.4 236 424)" fill="#4A4238" fontSize="7">
										{m.peso}
									</text>
								</g>
								<path d="M230 392 235 434" stroke="#8A6D50" strokeOpacity="0.22" strokeWidth="1.1" />
							</motion.g>
						</motion.g>

						{/* selo de origem */}
						<motion.g variants={fade(3.95, 0.6, 8)}>
							<circle cx="272" cy="478" r="24" fill="none" stroke="#8A6D50" strokeWidth="1.5" strokeOpacity="0.55" />
							<circle cx="272" cy="478" r="18" fill="none" stroke="#8A6D50" strokeWidth="1" strokeOpacity="0.35" />
							<path
								d="M263 478q9-13 18 0"
								fill="none"
								stroke="#8A6D50"
								strokeWidth="1.8"
								strokeOpacity="0.7"
								strokeLinecap="round"
							/>
						</motion.g>

						<motion.g variants={fade(4.1, 0.6, 6)}>
							<path d="M158 464 216 453" stroke="#8A6D50" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
							<path d="M158 482 198 475" stroke="#8A6D50" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
						</motion.g>
					</g>
				</motion.g>

				{/* 6 — os grãos */}
				{GRAOS.map((g, i) => (
					<motion.g
						key={i}
						variants={{
							hidden: { opacity: 0, scale: 0.3 },
							shown: { opacity: 1, scale: 1, transition: t(g.delay, 0.7) },
						}}
						style={{ transformOrigin: `${g.x}px ${g.y}px` }}
					>
						<motion.g
							animate={
								reduced ? undefined : { y: [0, g.drift, 0], rotate: [g.rot, g.rot + (g.drift > 0 ? 8 : -8), g.rot] }
							}
							transition={{ duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: g.delay + 0.6 }}
							style={{ transformOrigin: `${g.x}px ${g.y}px` }}
						>
							<ellipse
								cx={g.x}
								cy={g.y}
								rx={g.r}
								ry={g.r * 0.72}
								fill="url(#bean-body)"
								transform={`rotate(${g.rot} ${g.x} ${g.y})`}
							/>
							<path
								d={`M${g.x - g.r * 0.72} ${g.y}q${g.r * 0.72} ${g.r * 0.34} ${g.r * 1.44} 0`}
								fill="none"
								stroke="#1E1409"
								strokeOpacity="0.72"
								strokeWidth="1.6"
								strokeLinecap="round"
								transform={`rotate(${g.rot} ${g.x} ${g.y})`}
							/>
						</motion.g>
					</motion.g>
				))}
			</motion.svg>
		</motion.div>
	)
}
