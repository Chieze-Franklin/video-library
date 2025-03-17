import { cn } from "@/lib/utils";

type ShellProps = React.HTMLAttributes<HTMLDivElement>;

export function Shell({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-8 px-4 md:px-10 py-6 md:py-10 mx-auto max-w-7xl animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ShellHeader({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ShellTitle({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function ShellDescription({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <p
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function ShellContent({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <div
      className={cn("grid gap-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}