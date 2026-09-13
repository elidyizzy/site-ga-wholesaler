import { motion, useReducedMotion } from "framer-motion"

/**
 * A ideia virando produto, no primeiro viewport.
 *
 * A mensagem-mãe do site é "Você tem a ideia. Nós cuidamos do resto." — então o
 * hero não descreve isso, ele executa: um stand-up pouch de café se materializa
 * em quatro fases, do projeto ao produto pronto.
 *
 *   1. Linhas de projeto (eixo, cotas, marcações) entram como uma prancha.
 *   2. O contorno do pouch se desenha, traço por traço.
 *   3. O volume preenche — a embalagem ganha corpo e luz.
 *   4. Rótulo, válvula de desgaseificação e selo aparecem; as linhas de projeto
 *      recuam, porque o projeto já virou produto.
 *
 * O rótulo é deliberadamente abstrato: o DESIGN.md proíbe simular texto legível
 * em mockup, e a marca ali é a do cliente, não a da GA Food.
 */

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroPouch() {
	const reduced = useReducedMotion()

	// Sem movimento: entrega o produto pronto, sem encenação.
	const t = (delay: number, duration: number) =>
		reduced ? { duration: 0 } : { duration, delay, ease: EASE }

	return (
		<motion.svg
			viewBox="0 0 420 560"
			fill="none"
			className="h-full w-full"
			initial="hidden"
			animate="shown"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				<linearGradient id="pouch-body" x1="12%" y1="0%" x2="95%" y2="100%">
					<stop offset="0%" stopColor="#4A3728" />
					<stop offset="38%" stopColor="#2E2117" />
					<stop offset="78%" stopColor="#3B2B1E" />
					<stop offset="100%" stopColor="#1B140E" />
				</linearGradient>
				<linearGradient id="pouch-sheen" x1="0%" y1="0%" x2="100%" y2="60%">
					<stop offset="0%" stopColor="#FDFBF2" stopOpacity="0.42" />
					<stop offset="42%" stopColor="#C6A782" stopOpacity="0.12" />
					<stop offset="100%" stopColor="#FDFBF2" stopOpacity="0" />
				</linearGradient>
				<linearGradient id="pouch-seal" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#6E543B" />
					<stop offset="50%" stopColor="#8A6D50" />
					<stop offset="100%" stopColor="#5A4430" />
				</linearGradient>
				<linearGradient id="label-face" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#F7F2E8" />
					<stop offset="100%" stopColor="#E4D8C4" />
				</linearGradient>
				<radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#211D18" stopOpacity="0.32" />
					<stop offset="100%" stopColor="#211D18" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* 1 — a prancha: eixo, cotas e marcações de projeto */}
			<motion.g
				stroke="#8A6D50"
				strokeWidth="1"
				variants={{
					hidden: { opacity: 0 },
					shown: { opacity: [0, 0.75, 0.75, 0.18], transition: t(0, 3.4) },
				}}
			>
				<motion.line
					x1="210"
					y1="40"
					x2="210"
					y2="520"
					strokeDasharray="5 7"
					variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.1, 0.9) } }}
				/>
				<motion.line
					x1="60"
					y1="112"
					x2="360"
					y2="112"
					strokeDasharray="5 7"
					variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.3, 0.7) } }}
				/>
				<motion.line
					x1="60"
					y1="486"
					x2="360"
					y2="486"
					strokeDasharray="5 7"
					variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.45, 0.7) } }}
				/>
				<motion.g
					variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(0.6, 0.5) } }}
				>
					<line x1="74" y1="112" x2="74" y2="486" />
					<line x1="68" y1="112" x2="80" y2="112" />
					<line x1="68" y1="486" x2="80" y2="486" />
				</motion.g>
			</motion.g>

			{/* sombra de apoio — o produto passa a existir no espaço */}
			<motion.ellipse
				cx="212"
				cy="500"
				rx="118"
				ry="17"
				fill="url(#floor-shadow)"
				variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2, 0.9) } }}
			/>

			{/* 3 — o volume preenche (entra por baixo do contorno) */}
			<motion.path
				d="M118 132c0-5 4-9 9-9h166c5 0 9 4 9 9l-13 330c-1 15-13 26-28 26H159c-15 0-27-11-28-26z"
				fill="url(#pouch-body)"
				variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: t(1.5, 1) } }}
			/>
			<motion.path
				d="M118 132c0-5 4-9 9-9h166c5 0 9 4 9 9l-13 330c-1 15-13 26-28 26H159c-15 0-27-11-28-26z"
				fill="url(#pouch-sheen)"
				variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(1.9, 1.1) } }}
			/>

			{/* 2 — o contorno se desenha, traço por traço */}
			<motion.path
				d="M118 132c0-5 4-9 9-9h166c5 0 9 4 9 9l-13 330c-1 15-13 26-28 26H159c-15 0-27-11-28-26z"
				stroke="#8A6D50"
				strokeWidth="2"
				strokeLinecap="round"
				variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: t(0.75, 1.5) } }}
			/>

			{/* selo superior com serrilha */}
			<motion.g
				variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.2, 0.7) } }}
			>
				<rect x="122" y="96" width="176" height="27" rx="5" fill="url(#pouch-seal)" />
				{Array.from({ length: 15 }).map((_, i) => (
					<line
						key={i}
						x1={131 + i * 11.4}
						y1="101"
						x2={131 + i * 11.4}
						y2="118"
						stroke="#2E2117"
						strokeOpacity="0.34"
						strokeWidth="1.6"
					/>
				))}
			</motion.g>

			{/* válvula de desgaseificação — o detalhe que só existe em embalagem de café */}
			<motion.g
				variants={{ hidden: { opacity: 0, scale: 0.6 }, shown: { opacity: 1, scale: 1, transition: t(2.75, 0.6) } }}
				style={{ transformOrigin: "268px 178px" }}
			>
				<circle cx="268" cy="178" r="14" fill="#1B140E" stroke="#8A6D50" strokeWidth="1.5" />
				<circle cx="268" cy="178" r="5" fill="#8A6D50" fillOpacity="0.5" />
			</motion.g>

			{/* 4 — o rótulo: a marca do cliente entra por último */}
			<motion.g
				variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: t(2.45, 0.8) } }}
			>
				<rect x="150" y="232" width="124" height="150" rx="8" fill="url(#label-face)" />
				<motion.g
					stroke="#8A6D50"
					strokeLinecap="round"
					variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: t(2.95, 0.6) } }}
				>
					<line x1="167" y1="266" x2="257" y2="266" strokeWidth="7" />
					<line x1="167" y1="288" x2="231" y2="288" strokeWidth="7" />
					<line x1="167" y1="322" x2="245" y2="322" strokeWidth="2.4" strokeOpacity="0.55" />
					<line x1="167" y1="336" x2="219" y2="336" strokeWidth="2.4" strokeOpacity="0.55" />
					<line x1="167" y1="358" x2="196" y2="358" strokeWidth="2.4" strokeOpacity="0.3" />
				</motion.g>
			</motion.g>

			{/* respiração: o produto fica vivo depois de pronto */}
			{!reduced && (
				<motion.rect
					x="118"
					y="96"
					width="184"
					height="396"
					fill="transparent"
					animate={{ y: [0, -5, 0] }}
					transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.4 }}
				/>
			)}
		</motion.svg>
	)
}
