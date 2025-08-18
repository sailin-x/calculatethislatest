/**
 * Utility functions for formatting numbers, currencies, and other values
 * Used across calculator components for consistent display
 */

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US',
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
): string {
  if (isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minimumFractionDigits ?? 2,
    maximumFractionDigits: maximumFractionDigits ?? 2
  }).format(value);
}

/**
 * Format a number as percentage
 */
export function formatPercentage(
  value: number,
  locale: string = 'en-US',
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0%';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: minimumFractionDigits ?? 2,
    maximumFractionDigits: maximumFractionDigits ?? 2
  }).format(value / 100);
}

/**
 * Format a regular number with proper thousands separators
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minimumFractionDigits ?? 0,
    maximumFractionDigits: maximumFractionDigits ?? 2
  }).format(value);
}

/**
 * Format a number with compact notation (K, M, B)
 */
export function formatCompactNumber(
  value: number,
  locale: string = 'en-US'
): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

/**
 * Parse a formatted number string back to a number
 */
export function parseFormattedNumber(value: string): number {
  if (!value || typeof value !== 'string') {
    return 0;
  }

  // Remove common formatting characters
  const cleaned = value.replace(/[$,%\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format time duration in various units
 */
export function formatDuration(
  value: number,
  unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'
): string {
  if (isNaN(value) || !isFinite(value)) {
    return `0 ${unit}`;
  }

  const rounded = Math.round(value * 100) / 100;
  const unitLabel = rounded === 1 ? unit.slice(0, -1) : unit;
  return `${formatNumber(rounded)} ${unitLabel}`;
}

/**
 * Format a date in a readable format
 */
export function formatDate(
  date: Date | string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(dateObj);
}

/**
 * Format a number with ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export function formatOrdinal(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0th';
  }

  const rounded = Math.round(value);
  const suffix = ['th', 'st', 'nd', 'rd'][rounded % 10] || 'th';
  
  // Handle special cases for 11th, 12th, 13th
  if (rounded % 100 >= 11 && rounded % 100 <= 13) {
    return `${rounded}th`;
  }
  
  return `${rounded}${suffix}`;
}

/**
 * Format a ratio as a readable string (e.g., "3:1", "1.5:1")
 */
export function formatRatio(numerator: number, denominator: number): string {
  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    return '0:1';
  }

  const ratio = numerator / denominator;
  
  if (ratio >= 1) {
    return `${formatNumber(ratio, 'en-US', 0, 1)}:1`;
  } else {
    return `1:${formatNumber(1 / ratio, 'en-US', 0, 1)}`;
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format file size in bytes to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}