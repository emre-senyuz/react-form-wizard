import { useFormContext } from 'react-hook-form';
import { teamSizes, type FormValues } from '../schema';
import { Field, useFieldProps } from './Fields';
export default function CompanyStep() {
  const { register } = useFormContext<FormValues>();
  const companyProps = useFieldProps('companyName'), teamProps = useFieldProps('teamSize'), websiteProps = useFieldProps('website');
  return <div className="fields"><Field name="companyName" label="Company name"><input {...register('companyName')} {...companyProps} autoComplete="organization" placeholder="Your company or studio" /></Field><Field name="teamSize" label="Team size"><select {...register('teamSize')} {...teamProps}><option value="">Select your team size</option>{teamSizes.map(size => <option key={size}>{size}</option>)}</select></Field><Field name="website" label="Website (optional)" hint="A little context helps. No website yet? Leave this blank."><input {...register('website')} {...websiteProps} type="url" autoComplete="url" placeholder="https://yourcompany.com" /></Field></div>;
}
