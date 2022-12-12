import { useEffect, useRef, useState } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement = any>(
  handler: () => void
) {
  const ref = useRef<T>();

  useEffect(() => {
    const listener = (event: any) => {
      const { target } = event ?? {};
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    DEFAULT_EVENTS.forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      DEFAULT_EVENTS.forEach((fn) =>
        document.removeEventListener(fn, listener)
      );
    };
  }, [ref, handler]);

  return ref;
}

export function useDebouncedState(defaultValue: string, wait: number) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number | undefined>(undefined);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => clearTimeout, []);

  const debouncedSetValue = (newValue: string) => {
    clearTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setValue(newValue);
    }, wait);
  };

  return [value, debouncedSetValue] as const;
}