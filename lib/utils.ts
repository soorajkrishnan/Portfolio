import { twMerge } from "tailwind-merge";

export type ClassValue = ClassValue[] | Record<string, boolean | null | undefined> | string | number | null | boolean | undefined;

function toVal(mix: ClassValue): string {
  let str = '';
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object' && mix !== null) {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (const y in mix) {
        if (mix[y]) {
          str && (str += ' ');
          str += y;
        }
      }
    }
  }
  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  let str = '';
  for (let i = 0; i < inputs.length; i++) {
    const tmp = inputs[i];
    if (tmp) {
      const val = toVal(tmp);
      if (val) {
        str && (str += ' ');
        str += val;
      }
    }
  }
  return str;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
