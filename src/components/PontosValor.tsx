import { motion } from "framer-motion"

/**
 * Os três ganhos de virar marca própria — com ícones que **demonstram** o
 * conceito, não o ilustram.
 *
 * - **Margem**: a barra começa com a maior parte do lado de quem revende e a
 *   fatia vira pro seu lado. A migração é o argumento.
 * - **Coordenação**: sete pontos dispersos (as sete etapas) convergem para uma
 *   rota única terminando num só ponto de entrega.
 * - **Risco**: os três campos de conformidade são marcados um a um, antes de
 *   qualquer alerta — regulatório resolvido, não descoberto depois.
 *
 * Cada um roda uma vez, quando entra em cena, e respeita reduced-motion pelo
 * `useReducedMotion` embutido nos variants (estado final é o repouso).
 */

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: "-15% 0px -15% 0px" } as const

const PONTOS = [
	{
		titulo: "Margem",
		texto: "Fica com você, não com quem revende a marca de outra empresa.",
		icone: IconeMargem,
	},
	{
		titulo: "Coordenação",
		texto: "Um parceiro cuida das sete etapas. Você foca em vender.",
		icone: IconeCoordenacao,
	},
	{
		titulo: "Risco",
		texto: "Registro e regulatório resolvidos antes de virarem prejuízo.",
		icone: IconeRisco,
	},
]

export default function PontosValor() {
	return (
		<dl className="flex flex-col gap-12">
			{PONTOS.map(({ titulo, texto, icone: Icone }, i) => (
				<motion.div
					key={titulo}
					className="flex items-start gap-6"
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={VIEWPORT}
					transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
				>
					<Icone delay={i * 0.12} />
					<div className="pt-1.5">
						<dt className="text-sm font-medium tracking-[-0.01em] text-primary">{titulo}</dt>
						<dd className="mt-1.5 text-lg leading-snug font-light text-foreground">{texto}</dd>
					</div>
				</motion.div>
			))}
		</dl>
	)
}

interface IconeProps {
	delay: number
}

/** A fatia da margem vira pro seu lado: o anel preenche de um terço a quase tudo. */
function IconeMargem({ delay }: IconeProps) {
	const r = 15
	const volta = 2 * Math.PI * r

	return (
		<svg viewBox="0 0 44 44" className="size-16 shrink-0 sm:size-[4.5rem]" fill="none" aria-hidden="true">
			{/* o todo: a receita inteira do produto */}
			<circle cx="22" cy="22" r={r} className="stroke-border" strokeWidth="5.5" />
			{/* a sua fatia, que cresce */}
			<motion.circle
				cx="22"
				cy="22"
				r={r}
				className="stroke-primary"
				strokeWidth="5.5"
				strokeLinecap="round"
				transform="rotate(-90 22 22)"
				strokeDasharray={volta}
				initial={{ strokeDashoffset: volta * 0.7 }}
				whileInView={{ strokeDashoffset: volta * 0.16 }}
				viewport={VIEWPORT}
				transition={{ duration: 1.5, delay: delay + 0.35, ease: EASE }}
			/>
			{/* onde ela começou — a régua de comparação fica pra trás */}
			<motion.line
				x1="22"
				y1="4"
				x2="22"
				y2="10"
				className="stroke-muted-foreground/45"
				strokeWidth="1.4"
				strokeLinecap="round"
				transform="rotate(108 22 22)"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={VIEWPORT}
				transition={{ duration: 0.5, delay: delay + 1.5, ease: EASE }}
			/>
		</svg>
	)
}

/** Sete etapas espalhadas convergem para um parceiro só, no centro. */
function IconeCoordenacao({ delay }: IconeProps) {
	const etapas = [
		{ x: 22.0, y: 5.0 },
		{ x: 35.3, y: 11.4 },
		{ x: 38.6, y: 25.8 },
		{ x: 29.4, y: 37.3 },
		{ x: 14.6, y: 37.3 },
		{ x: 5.4, y: 25.8 },
		{ x: 8.7, y: 11.4 },
	]

	return (
		<svg viewBox="0 0 44 44" className="size-16 shrink-0 sm:size-[4.5rem]" fill="none" aria-hidden="true">
			{/* os caminhos até o centro, traçados antes dos pontos chegarem */}
			{etapas.map((p, i) => (
				<motion.line
					key={`l${i}`}
					x1={p.x}
					y1={p.y}
					x2="22"
					y2="22"
					className="stroke-border"
					strokeWidth="1.2"
					strokeLinecap="round"
					initial={{ pathLength: 0, opacity: 0 }}
					whileInView={{ pathLength: 1, opacity: 1 }}
					viewport={VIEWPORT}
					transition={{
						pathLength: { duration: 0.55, delay: delay + 0.3 + i * 0.06, ease: EASE },
						opacity: { duration: 0.01, delay: delay + 0.3 + i * 0.06 },
					}}
				/>
			))}

			{/* as sete etapas, que partem da borda e se recolhem ao centro */}
			{etapas.map((p, i) => (
				<motion.circle
					key={`p${i}`}
					r="2.6"
					className="fill-primary"
					initial={{ cx: p.x, cy: p.y, opacity: 0 }}
					whileInView={{ cx: p.x, cy: p.y, opacity: 1 }}
					viewport={VIEWPORT}
					transition={{ duration: 0.3, delay: delay + 0.25 + i * 0.06 }}
				/>
			))}

			{/* o parceiro único: assume o centro quando os caminhos fecham */}
			<motion.circle
				cx="22"
				cy="22"
				r="7"
				className="fill-background stroke-primary"
				strokeWidth="2.2"
				initial={{ scale: 0, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				viewport={VIEWPORT}
				transition={{ duration: 0.6, delay: delay + 1, ease: EASE }}
				style={{ transformOrigin: "22px 22px" }}
			/>
		</svg>
	)
}

/** Os campos de conformidade são marcados um a um, antes de virar problema. */
function IconeRisco({ delay }: IconeProps) {
	const linhas = [13, 22, 31]

	return (
		<svg viewBox="0 0 44 44" className="size-16 shrink-0 sm:size-[4.5rem]" fill="none" aria-hidden="true">
			<motion.path
				d="M11 5h15l7 7v27a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
				className="stroke-border"
				strokeWidth="1.6"
				strokeLinejoin="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={VIEWPORT}
				transition={{ duration: 0.9, delay: delay + 0.2, ease: EASE }}
			/>
			<motion.path
				d="M26 5v7h7"
				className="stroke-border"
				strokeWidth="1.6"
				strokeLinejoin="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={VIEWPORT}
				transition={{ duration: 0.4, delay: delay + 0.75, ease: EASE }}
			/>
			{linhas.map((y, i) => (
				<g key={y}>
					<line x1="21" y1={y + 5} x2="29" y2={y + 5} className="stroke-border" strokeWidth="1.5" strokeLinecap="round" />
					<motion.path
						d={`M13 ${y + 5} 15 ${y + 7} 18.5 ${y + 2.5}`}
						className="stroke-primary"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						initial={{ pathLength: 0, opacity: 0 }}
						whileInView={{ pathLength: 1, opacity: 1 }}
						viewport={VIEWPORT}
						transition={{
							pathLength: { duration: 0.4, delay: delay + 1 + i * 0.28, ease: EASE },
							opacity: { duration: 0.01, delay: delay + 1 + i * 0.28 },
						}}
					/>
				</g>
			))}
		</svg>
	)
}
