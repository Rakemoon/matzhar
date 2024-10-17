export type MergeLeft<L, R> = {
    [K in keyof L | keyof R]: K extends keyof R
        ? R[K]
        : K extends keyof L
          ? L[K]
          : never;
};
