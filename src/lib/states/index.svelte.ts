import type { Toast } from "./toast";

export const loginInfo = $state({
    isLoggedIn: false,
    user: {
        name: "Mathzar User",
        image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
});

export const toasts = $state<Toast[]>([]);
