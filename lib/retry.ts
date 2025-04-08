export async function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number
        initialDelay?: number
        maxDelay?: number
        backoffFactor?: number
    } = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        initialDelay = 1000,
        maxDelay = 10000,
        backoffFactor = 2
    } = options

    let lastError: Error | null = null
    let delay = initialDelay

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error as Error
            console.error(`Attempt ${attempt} failed:`, error)

            if (attempt === maxAttempts) {
                break
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay))

            // Increase delay for next attempt
            delay = Math.min(delay * backoffFactor, maxDelay)
        }
    }

    throw lastError
} 