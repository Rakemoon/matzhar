import { toasts } from "./index.svelte";

export type Toast = {
    summary: string;
    type: "success" | "warning" | "error" | "info";
    timestamp: number;
};

export function pushToast(summary: string, type: Toast["type"]) {
    const now = Date.now();
    toasts.push({ summary, type, timestamp: now });
    setTimeout(() => {
        const index = toasts.findIndex((x) => x.timestamp === now);
        toasts.splice(index, 1);
    }, 3000);
}
