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
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-xl"
      }`}
    >
      {label && <p className="label mb-4">{label}</p>}
      <h2
        className={`heading-md mb-4 ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {align === "center" && <div className="divider mx-auto mb-6" />}
      {align === "left" && <div className="divider mb-6" />}
      {description && (
        <p
          className={`text-base leading-relaxed ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
