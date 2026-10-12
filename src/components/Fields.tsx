import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../schema';
import type { ReactNode } from 'react';
export function Field({ name, label, hint, children }: { name: keyof FormValues; label: string; hint?: string; children: ReactNode }) {
  const { formState: { errors } } = useFormContext<FormValues>();
  const error = errors[name]?.message;
  return <div className="field"><label htmlFor={name}>{label}</label>{children}{hint && <p id={`${name}-hint`} className="hint">{hint}</p>}{error && <p id={`${name}-error`} className="error" role="alert">{error}</p>}</div>;
}
export function useFieldProps(name: keyof FormValues) {
  const { formState: { errors } } = useFormContext<FormValues>();
  return { id: name, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': `${name}-hint ${name}-error` };
}
