import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "destructive" | "outline"; // 新增支援的樣式
  className?: string;
}

export function Button({ children, className = "", variant = "default", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded border w-full text-left";
  const styles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      className={cn(base, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
