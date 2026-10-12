import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../schema';
import { Field, useFieldProps } from './Fields';
export default function PersonalStep() {
  const { register } = useFormContext<FormValues>();
  const nameProps = useFieldProps('fullName'), emailProps = useFieldProps('email'), phoneProps = useFieldProps('phone');
  return <div className="fields"><Field name="fullName" label="Full name"><input {...register('fullName')} {...nameProps} autoComplete="name" placeholder="e.g. Alex Morgan" /></Field><Field name="email" label="Email address"><input {...register('email')} {...emailProps} type="email" autoComplete="email" placeholder="alex@company.com" /></Field><Field name="phone" label="Phone number" hint="Include your country code, if applicable."><input {...register('phone')} {...phoneProps} type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" /></Field></div>;
}
