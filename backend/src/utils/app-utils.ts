export function responseMessage (
    message: string | null = null,
    body: any = null
) {
    return { message, body };
}

export function isMeterNumberValid (number: string): boolean {
    if (number.length != 6) return false;
    else return true;
}

export function isAmountValid (amount: number): boolean {
    if (amount < 100) return false;
    if (amount % 100 != 0) return false;
    return amount <= 182500;
}

export function isValidToken (token: string): boolean {
    if (token.length != 8) return false;
    else return true;
}
