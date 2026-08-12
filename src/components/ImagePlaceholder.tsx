type ImagePlaceholderProps = {
  label: string
  className?: string
  aspect?: string
}

/**
 * Stand-in for a real photo. Styled to look intentional rather than broken —
 * swap the call site for a real <img> once assets exist, then delete this.
 */
export default function ImagePlaceholder({ label, className = '', aspect = 'aspect-[4/5]' }: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspect} ${className} relative flex items-center justify-center overflow-hidden rounded-sm border border-line bg-card`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent, transparent 11px, color-mix(in srgb, var(--color-line) 60%, transparent) 11px, color-mix(in srgb, var(--color-line) 60%, transparent) 12px)',
      }}
    >
      <span className="font-display text-[11px] tracking-[0.14em] text-muted uppercase bg-card/90 px-3 py-1 rounded-full border border-line">
        {label}
      </span>
    </div>
  )
}
