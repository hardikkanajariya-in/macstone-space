interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
      }`}
    >
      {label && (
        <span className="label block text-xs font-semibold tracking-[0.25em] text-accent mb-3">
          {label}
        </span>
      )}
      <h2
        className={`heading-lg font-display tracking-wide font-normal mb-5 text-foreground`}
      >
        {title}
      </h2>
      
      {align === "center" && (
        <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-accent/80 to-transparent mb-6" />
      )}
      {align === "left" && (
        <div className="h-[1px] w-20 bg-gradient-to-r from-accent/80 to-transparent mb-6" />
      )}

      {description && (
        <p className="text-base md:text-lg leading-relaxed text-muted font-light">
          {description}
        </p>
      )}
    </div>
  );
}
