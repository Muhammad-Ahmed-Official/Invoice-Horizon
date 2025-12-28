import { ApiError } from "./apiError";

export const asyncHandlerFront = async <T>(
    fn: () => Promise<T>,
    onError?: (error: ApiError) => void
) => {
    try {
        return await fn();
    } catch (error) {
        if (error instanceof ApiError) {
            onError?.(error);
        } else {
            console.log('Unexpected error:', error);
        }
    }
};