import { cn } from "@/lib/utils";
export function Button({ children, className, ...props }) {
  return (
    <button className={cn("px-4 py-2 rounded border", className)} {...props}>
      {children}
    </button>
  );
}