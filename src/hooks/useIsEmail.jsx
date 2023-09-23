export const useIsEmail = (q, options) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isNotFullEmail =
        q.includes("@") &&
        !q.startsWith("@") &&
        !options.some((o) => o.email.includes(q))

    const isEmail =
        emailRegex.test(q) && !options.some((o) => o.email.includes(q))

    return { isNotFullEmail, isEmail }
}
