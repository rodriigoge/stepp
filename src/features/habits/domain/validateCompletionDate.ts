import type { LocalDate } from '../../../shared/date/LocalDate';
import {
  differenceInCalendarDays,
  isFuture,
} from '../../../shared/date/dateUtils';

/** Accepts any valid past date or today, including before habit creation.
 * All arguments are LocalDates, not createdAt timestamps. No clock is consulted.
 * Returns normally (void) when valid, including when all three days are equal.
 */
export function validateCompletionDate(
  completionDate: LocalDate,
  habitCreationDate: LocalDate,
  today: LocalDate,
): void {
  differenceInCalendarDays(completionDate, habitCreationDate);
  const future = isFuture(completionDate, today);

  if (future) {
    throw new RangeError('Completion date cannot be in the future.');
  }
}
