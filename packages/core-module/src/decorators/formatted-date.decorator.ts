import {property} from '@loopback/repository';

/**
 *
 * @returns ISO string format of Date
 */
export function ISODate() {
  return new Date().toISOString();
}

/**
 * Custom decorator for date properties.
 * @param defaultFn - set to 'now' to use the current timestamp, or null for no automatic default.
 * @returns a custom property
 */
export function FormattedDate(defaultFn: 'now' | null = null) {
  return property({
    type: 'string',
    format: 'date-time',
    defaultFn: defaultFn ?? undefined, // use default function provided by DB
    default: defaultFn ? undefined : ISODate(), // default current date if no defaultFn
  });
}
