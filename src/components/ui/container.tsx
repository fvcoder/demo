import { cn } from "@heroui/styles";
import { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-5xl px-4", className)} {...props} />;
}
