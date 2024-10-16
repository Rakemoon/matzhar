export async function waiting<T, E extends Error = Error>(promise: Promise<T>) {
    let result: T | null = null;
    let error: E | null = null;
    try {
        result = await promise;
    } catch (e) {
        error = e as E;
    }
    return [error, result] as [error: typeof error, result: typeof result];
}
