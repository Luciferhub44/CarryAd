export default function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 220 200" aria-hidden="true">
      <path
        d="M 190 100 A 70 70 0 0 1 50 100 A 55 55 0 0 1 160 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M 160 100 C 162 64 130 48 102 58 C 76 67 68 96 82 116 C 94 133 122 134 132 118 C 140 105 132 90 118 90 C 108 90 104 100 110 106"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  )
}
