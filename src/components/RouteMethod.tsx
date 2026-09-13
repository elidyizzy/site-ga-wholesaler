import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import StageIcon, { type StageIconName } from "./StageIcon"

export interface Stage {
	numero: string
	titulo: string
	descricao: string
	icone: StageIconName
	imagemSrc: string
	imagemAlt: string
}

const markerVariants = {
	pending: {
		borderColor: "#E7E2D9",
		backgroundColor: "rgba(255,255,255,0)",
	},
	reached: {
		borderColor: "#8A6D50",
		backgroundColor: "#8A6D50",
	},
}

const numeralVariants = {
	pending: { color: "#6B6559" },
	reached: { color: "#FFFFFF" },
}

export default function RouteMethod({ stages }: { stages: Stage[] }) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.7", "end 0.4"],
	})
	const traveledHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

	return (
		<div ref={containerRef} className="relative">
			<div className="absolute top-0 bottom-0 left-6 w-px border-l border-dashed border-border md:left-1/2">
				<motion.div className="absolute inset-x-0 top-0 w-px bg-primary" style={{ height: traveledHeight }} />
			</div>

			<div className="flex flex-col gap-16 md:gap-20">
				{stages.map((stage, i) => {
					const fromLeft = i % 2 === 0
					return (
						<div key={stage.numero} className="relative pl-16 md:pl-0">
							<motion.div
								initial="pending"
								whileInView="reached"
								viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
								variants={markerVariants}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className="absolute top-1 left-6 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 shadow-[var(--shadow-lift-1)] md:left-1/2"
							>
								<motion.span variants={numeralVariants} className="text-sm font-semibold tabular-nums">
									{stage.numero}
								</motion.span>
							</motion.div>

							<motion.div
								initial="pending"
								whileInView="reached"
								viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
								variants={{ pending: { opacity: 0.55, y: 12 }, reached: { opacity: 1, y: 0 } }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className={
									fromLeft
										? "flex flex-col gap-4 md:mr-auto md:w-[calc(50%-3rem)] md:items-end md:text-right"
										: "flex flex-col gap-4 md:ml-auto md:w-[calc(50%-3rem)] md:items-start"
								}
							>
								<div className="aspect-4/5 w-full overflow-hidden rounded-2xl shadow-[var(--shadow-lift-2)]">
									<img
										src={stage.imagemSrc}
										alt={stage.imagemAlt}
										loading="lazy"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className={`flex flex-col gap-2 ${fromLeft ? "md:items-end" : ""}`}>
									<StageIcon name={stage.icone} className="size-9 text-primary" />
									<h3 className="mt-1 text-lg font-medium tracking-[-0.01em] text-foreground">{stage.titulo}</h3>
									<p className="text-sm text-muted-foreground">{stage.descricao}</p>
									<a
										href="#contato"
										className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
									>
										Contratar só esta etapa
										<ArrowRight className="size-3.5" />
									</a>
								</div>
							</motion.div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
