import { z } from 'zod';
export const services = ['Brand strategy', 'Visual identity', 'Web design', 'Development', 'Content & copy', 'Something else'] as const;
export const teamSizes = ['Just me', '2–10 people', '11–50 people', '51–200 people', '201+ people'] as const;
export const budgets = ['$2,000–$5,000', '$5,000–$10,000', '$10,000–$25,000', '$25,000+', 'Let’s discuss'] as const;
export const schema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name (at least 2 characters).').max(100, 'Keep your name under 100 characters.'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  phone: z.string().trim().regex(/^\+?[\d\s().-]+$/, 'Use a phone number with digits and optional +, spaces, (), or dashes.').refine(v => { const n = v.replace(/\D/g, '').length; return n >= 7 && n <= 15; }, 'Enter a phone number with 7–15 digits.'),
  companyName: z.string().trim().min(2, 'Enter a company name (at least 2 characters).').max(120, 'Keep the company name under 120 characters.'),
  teamSize: z.enum(teamSizes, { error: 'Choose your team size.' }),
  website: z.string().trim().max(2048, 'Keep the URL under 2,048 characters.').refine(v => { if (!v) return true; try { const u = new URL(v); return ['https:', 'http:'].includes(u.protocol) && u.hostname.includes('.'); } catch { return false; } }, 'Enter a complete website URL, such as https://example.com, or leave it blank.'),
  services: z.array(z.enum(services)).min(1, 'Choose at least one service.'),
  budget: z.enum(budgets, { error: 'Choose a budget range.' }),
  notes: z.string().trim().max(1000, 'Keep your notes under 1,000 characters.'),
  consent: z.boolean().refine(v => v, 'Please acknowledge that this is a local demo.'),
});
export type FormValues = z.infer<typeof schema>;
export const stepFields: (keyof FormValues)[][] = [['fullName', 'email', 'phone'], ['companyName', 'teamSize', 'website'], ['services', 'budget', 'notes', 'consent']];
