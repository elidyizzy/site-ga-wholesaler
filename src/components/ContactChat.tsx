import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

interface Props {
	whatsappNumber: string
}

const QUESTIONS = [
	{ key: "nome", placeholder: "Seu nome" },
	{ key: "email", placeholder: "seu@email.com" },
	{ key: "mensagem", placeholder: "Quero criar uma marca própria de..." },
] as const

type AnswerKey = (typeof QUESTIONS)[number]["key"]
type Answers = Record<AnswerKey, string>

export default function ContactChat({ whatsappNumber }: Props) {
	const [step, setStep] = useState(0)
	const [answers, setAnswers] = useState<Answers>({ nome: "", email: "", mensagem: "" })
	const [inputValue, setInputValue] = useState("")
	const [error, setError] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (step < 2) inputRef.current?.focus()
		else if (step === 2) textareaRef.current?.focus()
	}, [step])

	const prompts = [
		"Oi! Qual é o seu nome?",
		answers.nome ? `Prazer, ${answers.nome.split(" ")[0]}! Qual é o seu e-mail?` : "Qual é o seu e-mail?",
		"Conta em poucas linhas o que você está pensando em lançar.",
	]

	function validate(): string | null {
		if (step === 0 && inputValue.trim().length < 2) return "Digite seu nome."
		if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.trim())) return "Digite um e-mail válido."
		if (step === 2 && inputValue.trim().length < 5) return "Conta um pouco mais pra gente entender."
		return null
	}

	function handleNext() {
		const err = validate()
		if (err) {
			setError(err)
			return
		}
		setError("")
		const key = QUESTIONS[step].key
		setAnswers((prev) => ({ ...prev, [key]: inputValue.trim() }))
		setInputValue("")
		setStep((s) => s + 1)
	}

	const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
		`Olá! Meu nome é ${answers.nome}.\nE-mail: ${answers.email}\n\n${answers.mensagem}`
	)}`

	return (
		<div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-background text-left shadow-[0_20px_60px_-20px_rgba(33,29,24,0.25)]">
			<div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4">
				<div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<MessageCircle className="size-4" />
				</div>
				<div>
					<p className="text-sm font-medium text-foreground">GA Food</p>
					<p className="text-xs text-muted-foreground">Normalmente responde em minutos</p>
				</div>
			</div>

			<div className="flex flex-col gap-4 px-5 py-6">
				{QUESTIONS.slice(0, step).map((q, i) => (
					<div key={q.key} className="flex flex-col gap-2">
						<ChatBubble from="bot">{prompts[i]}</ChatBubble>
						<ChatBubble from="user">{answers[q.key]}</ChatBubble>
					</div>
				))}

				{step < QUESTIONS.length && (
					<motion.div
						key={step}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className="flex flex-col gap-3"
					>
						<ChatBubble from="bot">{prompts[step]}</ChatBubble>
						{step < 2 ? (
							<input
								ref={inputRef}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleNext()}
								placeholder={QUESTIONS[step].placeholder}
								className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
							/>
						) : (
							<textarea
								ref={textareaRef}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder={QUESTIONS[step].placeholder}
								rows={3}
								className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
							/>
						)}
						{error && <p className="text-xs text-destructive">{error}</p>}
						<button
							type="button"
							onClick={handleNext}
							className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
						>
							{step === 2 ? "Concluir" : "Continuar"}
							<ArrowRight className="size-4" />
						</button>
					</motion.div>
				)}

				{step === QUESTIONS.length && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className="flex flex-col items-center gap-4"
					>
						<ChatBubble from="bot">
							Perfeito, {answers.nome.split(" ")[0]}. Manda esse resumo pro nosso WhatsApp e a gente já
							te chama com os próximos passos.
						</ChatBubble>
						<a
							href={whatsappHref}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-8px_rgba(138,109,80,0.6)] transition-transform hover:scale-[1.03] active:scale-95"
						>
							Enviar mensagem
							<MessageCircle className="size-4" />
						</a>
					</motion.div>
				)}
			</div>
		</div>
	)
}

function ChatBubble({ from, children }: { from: "bot" | "user"; children: ReactNode }) {
	const isBot = from === "bot"
	return (
		<div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
			<div
				className={
					isBot
						? "max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm text-foreground"
						: "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
				}
			>
				{children}
			</div>
		</div>
	)
}
