export type Nullable<T> = Extract<T, null | undefined>;

export function isNullable<T>(value: T): value is Nullable<T> {
  return value === undefined || value === null;
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return !isNullable(value);
}
