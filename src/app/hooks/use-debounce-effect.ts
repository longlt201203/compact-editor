import { useEffect } from "react";

export function useDebounceEffect(func: () => void, deps: any[], delay: number) {
    useEffect(() => {
        const handler = setTimeout(() => {
            func();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [...deps, delay]);
}