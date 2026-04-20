interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function HeaderTitle({ title, subtitle }: HeaderProps) {
  return (
    <header>
      <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </header>
  );
}
