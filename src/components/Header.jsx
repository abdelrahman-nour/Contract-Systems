import Logo from './Logo'

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-line pb-6">
      <a href="https://tapko.link" aria-label="tapko" className="shrink-0">
        <Logo className="h-8 sm:h-9" />
      </a>
      <span className="hidden font-mono text-xs text-mute sm:inline" dir="ltr">One tap. Everything connected.</span>
    </header>
  )
}
