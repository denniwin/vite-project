import { useRef, useEffect } from "react";

type DebouncedFunction = (...args: any[]) => void;

export default function useDebouncedFunction<T extends DebouncedFunction>(
  func: T,
  delay: number,
  cleanUp = false
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return ((...args: Parameters<T>) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  }) as T;
}