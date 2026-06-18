/**
 * Shared card decoration layers, so every card across the site reads as one family.
 * Drop into any `relative overflow-hidden` card; content must sit on `relative z-10`.
 *
 *  - <CardDecor />        — subtle orange radial glow + faint grid (the default treatment).
 *  - <HighlightDecor />   — black card with side orange glows (для выделенных
 *                            индивидуальных программ, как на оригинальном сайте).
 *
 * Both rely on a `group` class on the card root for hover transitions.
 */

export function CardDecor() {
  return (
    <>
      {/* Orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4] md:opacity-[0.6]"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 83, 49, 0.13) 0%, rgba(255, 83, 49, 0.04) 45%, transparent 100%)",
        }}
      />
      {/* Faint grid pattern with fade-out mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.7] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(160,160,160,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(160,160,160,0.16) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center center",
        }}
      />
    </>
  )
}

export function HighlightDecor() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit] overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-[#0f0e0d]" />
      {/* Inset orange edge glow, intensifies on hover */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_0_rgba(255,83,49,0.15),inset_0_0_80px_0_rgba(255,83,49,0.05)] dark:shadow-[inset_0_0_15px_0_rgba(255,83,49,0.3),inset_0_0_50px_0_rgba(255,83,49,0.15)] group-hover:shadow-[inset_0_0_40px_0_rgba(255,83,49,0.25),inset_0_0_100px_0_rgba(255,83,49,0.1)] dark:group-hover:shadow-[inset_0_0_20px_0_rgba(255,83,49,0.4),inset_0_0_80px_0_rgba(255,83,49,0.2)] transition-shadow duration-700" />
      {/* Side orange glows — top-left + bottom-right corners */}
      <div
        className="absolute inset-0 dark:mix-blend-screen opacity-100 dark:opacity-80"
        style={{ background: "radial-gradient(circle at 0% 0%, rgba(255,83,49,0.15) 0%, rgba(255,83,49,0.03) 30%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 dark:mix-blend-screen opacity-100 dark:opacity-80"
        style={{ background: "radial-gradient(circle at 100% 100%, rgba(255,83,49,0.1) 0%, transparent 40%)" }}
      />
    </div>
  )
}
