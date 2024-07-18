export interface PopUpItem {
  timestamp: number;
  message: string;
  type: "chekmark" | "exclamation" | "warn"
}

export const PopUpState = $state<PopUpItem[]>([]);


export function pushPopUp(item: Omit<PopUpItem, "timestamp">) {
  const timestamp = Date.now();
  PopUpState.push({ ...item, timestamp});
  setTimeout(() => PopUpState.splice(PopUpState.findIndex(x => x.timestamp === timestamp), 1), 3_000)
}
