import { motion, useReducedMotion } from "framer-motion"

/**
 * A ideia virando produto, no primeiro viewport.
 *
 * Registro definido pela referência do cliente: pacote de café **kraft claro**,
 * em perspectiva 3/4 com lateral visível (volume real, não silhueta chapada),
 * galho de café em line art, etiqueta de ficha técnica onde a marca do cliente
 * entra, e grãos em suspensão.
 *
 * O que a referência não tem, e é o ponto: o pacote se **constrói**. Linhas de
 * projeto entram como prancha, o contorno se desenha, o volume preenche, o
 * galho é traçado, a ficha técnica assenta e os grãos chegam por último.
 * "Você tem a ideia. Nós cuidamos do resto." — executado, não descrito.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const GRAOS = [
	{ x: 62, y: 150, r: 15, rot: -24, delay: 4.0, drift: -9 },
	{ x: 372, y: 108, r: 19, rot: 32, delay: 4.12, drift: 11 },
	{ x: 398, y: 300, r: 13, rot: -12, delay: 4.24, drift: -7 },
	{ x: 44, y: 352, r: 17, rot: 44, delay: 4.34, drift: 10 },
	{ x: 344, y: 496, r: 12, rot: -38, delay: 4.46, drift: -8 },
	{ x: 92, y: 520, r: 15, rot: 18, delay: 4.56, drift: 9 },
]

export default function HeroPouch() {
	const reduced = useReducedMotion()

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

	return (
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
				<linearGradient id="kraft-face" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#F6EAD6" />
					<stop offset="42%" stopColor="#E8D6B8" />
					<stop offset="100%" stopColor="#D8C09B" />
				</linearGradient>
				<linearGradient id="kraft-side" x1="0%" y1="0%" x2="100%" y2="30%">
					<stop offset="0%" stopColor="#C9AE87" />
					<stop offset="55%" stopColor="#B2936C" />
					<stop offset="100%" stopColor="#9C7E59" />
				</linearGradient>
				<linearGradient id="kraft-top" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#EADCC2" />
					<stop offset="100%" stopColor="#C4A67F" />
				</linearGradient>
				<linearGradient id="face-sheen" x1="0%" y1="0%" x2="85%" y2="70%">
					<stop offset="0%" stopColor="#FFFDF6" stopOpacity="0.65" />
					<stop offset="38%" stopColor="#FFFDF6" stopOpacity="0.12" />
					<stop offset="100%" stopColor="#8A6D50" stopOpacity="0.12" />
				</linearGradient>
				<linearGradient id="bean-body" x1="20%" y1="0%" x2="90%" y2="100%">
					<stop offset="0%" stopColor="#7A5735" />
					<stop offset="55%" stopColor="#4E3820" />
					<stop offset="100%" stopColor="#32220F" />
				</linearGradient>
				<radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#211D18" stopOpacity="0.3" />
					<stop offset="100%" stopColor="#211D18" stopOpacity="0" />
				</radialGradient>
				<clipPath id="face-clip">
					<path d="M140 196 296 162l12 358-156 32z" />
				</clipPath>
			</defs>

			{/* 1 — prancha de projeto */}
			<motion.g
				stroke="#8A6D50"
				strokeWidth="1"
				variants={{ hidden: { opacity: 0 }, shown: { opacity: [0, 0.7, 0.7, 0.14], transition: t(0, 4.2) } }}
			>
				<motion.line x1="228" y1="70" x2="228" y2="576" strokeDasharray="5 7" variants={draw(0.1, 0.9)} />
				<motion.line x1="70" y1="150" x2="396" y2="150" strokeDasharray="5 7" variants={draw(0.3, 0.7)} />
				<motion.line x1="70" y1="546" x2="396" y2="546" strokeDasharray="5 7" variants={draw(0.45, 0.7)} />
				<motion.g variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(0.6, 0.5) } }}>
					<line x1="86" y1="150" x2="86" y2="546" />
					<line x1="80" y1="150" x2="92" y2="150" />
					<line x1="80" y1="546" x2="92" y2="546" />
				</motion.g>
			</motion.g>

			<motion.ellipse
				cx="238"
				cy="556"
				rx="132"
				ry="18"
				fill="url(#floor-shadow)"
				variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.2, 0.9) } }}
			/>

			{/* o pacote inteiro respira depois de pronto */}
			<motion.g
				animate={reduced ? undefined : { y: [0, -7, 0] }}
				transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 5 }}
			>
				{/* 3 — volume: face, lateral e topo (a lateral é o que dá corpo 3D) */}
				<motion.path
					d="M140 196 296 162l12 358-156 32z"
					fill="url(#kraft-face)"
					variants={fade(1.5, 1, 16)}
				/>
				<motion.path d="M296 162l38 20 10 330-38 8z" fill="url(#kraft-side)" variants={fade(1.62, 1, 16)} />
				<motion.path d="M140 196 296 162l38 20-156 34z" fill="url(#kraft-top)" variants={fade(1.74, 1, 16)} />
				<motion.path
					d="M140 196 296 162l12 358-156 32z"
					fill="url(#face-sheen)"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.1, 1.1) } }}
				/>

				{/* vincos da selagem no topo */}
				<motion.g
					stroke="#9C7E59"
					strokeOpacity="0.55"
					strokeWidth="1.6"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.35, 0.6) } }}
				>
					<path d="M148 206 298 175" />
					<path d="M151 217 300 186" />
					<path d="M154 228 302 197" />
				</motion.g>

				{/* 2 — contorno se desenha */}
				<motion.g stroke="#8A6D50" strokeWidth="2" strokeLinejoin="round">
					<motion.path d="M140 196 296 162l12 358-156 32z" variants={draw(0.75, 1.4)} />
					<motion.path d="M296 162l38 20 10 330-38 8" variants={draw(1.05, 1)} />
					<motion.path d="M140 196 296 162l38 20" variants={draw(1.25, 0.8)} />
				</motion.g>

				<g clipPath="url(#face-clip)">
					{/* 4 — galho de café em line art */}
					<g stroke="#8A6D50" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.5">
						<motion.path d="M166 288q46-26 100-34t62 2" strokeWidth="1.6" variants={draw(2.55, 1)} />
						<motion.path d="M200 278q-14-20-4-36 18 10 14 32" strokeWidth="1.4" variants={draw(2.78, 0.5)} />
						<motion.path d="M200 278q18-16 34-10-10 18-32 14" strokeWidth="1.4" variants={draw(2.86, 0.5)} />
						<motion.path d="M244 270q-14-20-4-36 18 10 14 32" strokeWidth="1.4" variants={draw(2.96, 0.5)} />
						<motion.path d="M244 270q18-16 34-10-10 18-32 14" strokeWidth="1.4" variants={draw(3.04, 0.5)} />
						<motion.path d="M222 296q14 20 4 36-18-10-14-32" strokeWidth="1.4" variants={draw(3.14, 0.5)} />
						<motion.path d="M266 288q14 20 4 36-18-10-14-32" strokeWidth="1.4" variants={draw(3.24, 0.5)} />
						<motion.circle cx="300" cy="282" r="6.5" strokeWidth="1.4" variants={draw(3.36, 0.4)} />
						<motion.circle cx="313" cy="295" r="4.5" strokeWidth="1.4" variants={draw(3.44, 0.4)} />
					</g>

					{/* 5 — ficha técnica: onde a marca do cliente entra */}
					<motion.g variants={fade(3.6, 0.7, 14)}>
						<path d="M158 342 290 316l6 104-132 26z" fill="#FCF7ED" fillOpacity="0.96" />
						<path
							d="M158 342 290 316l6 104-132 26z"
							stroke="#8A6D50"
							strokeOpacity="0.45"
							strokeWidth="1.5"
						/>
						<text
							x="170"
							y="380"
							transform="rotate(-11 170 380)"
							fill="#2E2117"
							fontSize="21"
							fontWeight="600"
							letterSpacing="-0.5"
							fontFamily="'Geist Variable', system-ui, sans-serif"
						>
							SUA MARCA
						</text>
						<path d="M164 392 294 366" stroke="#8A6D50" strokeOpacity="0.32" strokeWidth="1.2" />
						<g
							fill="#6B6559"
							fontSize="8"
							letterSpacing="0.6"
							fontFamily="'Geist Variable', system-ui, sans-serif"
						>
							<text x="170" y="410" transform="rotate(-11 170 410)">100% ARÁBICA</text>
							<text x="234" y="397" transform="rotate(-11 234 397)">TORRA MÉDIA</text>
						</g>
						<path d="M226 383 230 425" stroke="#8A6D50" strokeOpacity="0.25" strokeWidth="1.2" />
					</motion.g>

					{/* selo de origem */}
					<motion.g variants={fade(3.95, 0.6, 8)}>
						<circle cx="268" cy="474" r="23" fill="none" stroke="#8A6D50" strokeWidth="1.6" strokeOpacity="0.6" />
						<circle cx="268" cy="474" r="17" fill="none" stroke="#8A6D50" strokeWidth="1" strokeOpacity="0.4" />
						<path
							d="M259 474q9-12 18 0"
							fill="none"
							stroke="#8A6D50"
							strokeWidth="1.8"
							strokeOpacity="0.75"
							strokeLinecap="round"
						/>
					</motion.g>

					<motion.g variants={fade(4.1, 0.6, 6)}>
						<path d="M166 458 218 449" stroke="#8A6D50" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" />
						<path d="M166 476 202 470" stroke="#8A6D50" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
					</motion.g>
				</g>
			</motion.g>

			{/* 6 — os grãos chegam por último e ficam em suspensão */}
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
						animate={reduced ? undefined : { y: [0, g.drift, 0], rotate: [g.rot, g.rot + (g.drift > 0 ? 7 : -7), g.rot] }}
						transition={{
							duration: 6 + i * 0.7,
							repeat: Infinity,
							ease: "easeInOut",
							delay: g.delay + 0.6,
						}}
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
							strokeOpacity="0.75"
							strokeWidth="1.6"
							strokeLinecap="round"
							transform={`rotate(${g.rot} ${g.x} ${g.y})`}
						/>
					</motion.g>
				</motion.g>
			))}
		</motion.svg>
	)
}
