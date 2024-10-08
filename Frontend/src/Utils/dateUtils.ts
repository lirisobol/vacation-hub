// Converts an ISO date string to a simple date string (YYYY-MM-DD).
export function toSimpleDate(isoDate:any) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
}
