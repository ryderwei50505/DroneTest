import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn("px-4 py-2 rounded border", className)} {...props}>
      {children}
    </button>
  );
}
