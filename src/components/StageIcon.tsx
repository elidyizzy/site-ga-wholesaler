import { motion } from "framer-motion"

/**
 * Ícones autorais das 7 etapas — desenhados no vocabulário do private label
 * (pouch, balança de blend, esteira, produto na prateleira) em vez dos
 * genéricos de biblioteca, que serviriam a qualquer empresa. Mesmo peso de
 * traço (1.5) e mesma malha 24×24 da lucide, então convivem com os ícones
 * de UI do resto do site sem destoar.
 *
 * Cada traço se desenha quando a etapa entra em cena: `pathLength` animado,
 * escalonado na ordem em que a mão desenharia.
 */

export type StageIconName =
	| "diagnostico"
	| "produto"
	| "branding"
	| "embalagem"
	| "regulatorio"
	| "producao"
	| "lancamento"

const PATHS: Record<StageIconName, string[]> = {
	// Briefing sob análise: documento, linhas de conteúdo, lente sobre ele.
	diagnostico: ["M4.5 3.5h7.5l3.5 3.5v4", "M12 3.5V7h3.5", "M7 9.5h5", "M7 12.5h3", "M14.5 16a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0Z", "M20.2 18.4 22 20.2"],
	// Curadoria e blend: matérias-primas distintas entrando, um produto só saindo.
	produto: ["M7.2 5.4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z", "M13.4 4.8a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 0 0-2.4 0Z", "M10.9 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z", "M4.5 10.5h15l-5.6 6.4v3.6l-3.8-1.9v-1.7L4.5 10.5Z"],
	// Identidade: a etiqueta da marca, com o nome já aplicado nela.
	branding: ["M3.5 11.8V5.2a1.7 1.7 0 0 1 1.7-1.7h6.6c.45 0 .88.18 1.2.5l7 7a1.7 1.7 0 0 1 0 2.4l-6.6 6.6a1.7 1.7 0 0 1-2.4 0l-7-7a1.7 1.7 0 0 1-.5-1.2Z", "M6.9 6.9h.01", "m9.4 12.2 3.6 3.6", "m11.6 10 3.6 3.6"],
	// Embalagem: o stand-up pouch — a forma mais icônica do private label.
	embalagem: ["M7.5 7.5h9l-1 12.5h-7l-1-12.5Z", "M7.5 7.5 8.4 4h7.2l.9 3.5", "M10 4v3.5", "M14 4v3.5", "M10.2 12.5h3.6"],
	// Conformidade: documento com selo aplicado.
	regulatorio: ["M5 3.5h7.5L16 7v6.2", "M12.5 3.5V7H16", "M7.5 9.5h5", "M7.5 12.5h3.5", "M11.6 17.2a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z", "m13.9 17.2 1.3 1.3 2.4-2.6"],
	// Produção e logística: a caixa selada correndo sobre os rolos.
	producao: ["M7 4.5h10v9H7z", "M7 8.2h10", "M12 4.5v3.7", "M3 17h18", "M4.8 19.4a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 0 0-2.6 0Z", "M10.7 19.4a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 0 0-2.6 0Z", "M16.6 19.4a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 0 0-2.6 0Z"],
	// Lançamento: o produto finalmente na prateleira.
	lancamento: ["M3 20h18", "M6 20V9.2h4V20", "M14 20V6h4v14", "M6 12.6h4", "M14 10h4"],
}

interface Props {
	name: StageIconName
	className?: string
}

export default function StageIcon({ name, className }: Props) {
	const paths = PATHS[name]

	return (
		<motion.svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			initial="hidden"
			whileInView="drawn"
			viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
			aria-hidden="true"
		>
			{paths.map((d, i) => (
				<motion.path
					key={d}
					d={d}
					variants={{
						hidden: { pathLength: 0, opacity: 0 },
						drawn: {
							pathLength: 1,
							opacity: 1,
							transition: {
								pathLength: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.09 },
								opacity: { duration: 0.15, delay: 0.12 + i * 0.09 },
							},
						},
					}}
				/>
			))}
		</motion.svg>
	)
}
