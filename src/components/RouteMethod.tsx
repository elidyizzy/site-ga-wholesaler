import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "framer-motion"
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

export default function RouteMethod({ stages }: { stages: Stage[] }) {
	const ref = useRef<HTMLDivElement>(null)
	const reduce = useReducedMotion()

	useEffect(() => {
		// Only run on client-side to avoid SSR issues
		if (typeof window === "undefined" || reduce || !ref.current) return
		
		// Register plugin here to avoid SSR errors
		gsap.registerPlugin(ScrollTrigger)
		
		const ctx = gsap.context(() => {
			const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card")
			cardEls.forEach((card, i) => {
				if (i === cardEls.length - 1) return
				ScrollTrigger.create({
					trigger: card,
					start: "top top", // pin at viewport top
					endTrigger: cardEls[cardEls.length - 1],
					end: "top top",
					pin: true,
					pinSpacing: false,
				})
				gsap.to(card, {
					scale: 0.92,
					opacity: 0.55,
					ease: "none",
					scrollTrigger: {
						trigger: cardEls[i + 1],
						start: "top bottom",
						end: "top top",
						scrub: true,
					},
				})
			})
		}, ref)
		
		return () => ctx.revert()
	}, [reduce])

	return (
		<div ref={ref} className="relative mt-8 w-full max-w-5xl mx-auto">
			{stages.map((stage, i) => (
				<div
					key={stage.numero}
					className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center pt-8 pb-8"
				>
					<div className="w-full bg-background rounded-[2rem] shadow-[var(--shadow-lift-3)] border border-border/60 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16">
						
						{/* Left side: Content */}
						<div className="flex-1 flex flex-col items-start text-left">
							<div className="flex items-center gap-5 mb-8">
								<div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary shadow-[var(--shadow-lift-1)]">
									<StageIcon name={stage.icone} className="size-7" />
								</div>
								<span className="text-xl font-medium tracking-[-0.01em] text-muted-foreground tabular-nums">
									{stage.numero} / 07
								</span>
							</div>
							
							<h3 className="text-3xl md:text-[2.5rem] font-light tracking-[-0.03em] text-foreground leading-[1.1] text-balance">
								{stage.titulo}
							</h3>
							<p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
								{stage.descricao}
							</p>
							
							<a
								href="#contato"
								className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-7 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary active:scale-95"
							>
								Contratar só esta etapa
								<ArrowRight className="size-4" />
							</a>
						</div>

						{/* Right side: Image */}
						<div className="w-full md:flex-1 max-w-md aspect-[4/5] shrink-0 overflow-hidden rounded-2xl shadow-[var(--shadow-lift-2)] bg-muted">
							<img
								src={stage.imagemSrc}
								alt={stage.imagemAlt}
								loading={i === 0 ? "eager" : "lazy"}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
