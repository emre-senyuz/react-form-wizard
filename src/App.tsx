import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check, CheckCheck, Layers2, LockKeyhole, RotateCcw, Sparkles } from 'lucide-react';
import { schema, stepFields, type FormValues } from './schema';
import PersonalStep from './components/PersonalStep';
import CompanyStep from './components/CompanyStep';
import PreferencesStep from './components/PreferencesStep';
import Summary from './components/Summary';

const steps = [{ title: 'Personal', description: 'A little about you' }, { title: 'Company', description: 'Meet your business' }, { title: 'Preferences', description: 'Make it your own' }];
const titles = ['First, let’s meet you.', 'Tell us about your company.', 'What do you have in mind?', 'Looking good. One last check.'];
const descriptions = ['Great work starts with a good introduction. Tell us a little about yourself.', 'Every business has a story. Help us get to know yours.', 'A few details will help shape the right project for you.', 'Take a moment to review your details before completing the demo.'];

export default function App() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<FormValues | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const methods = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onTouched', shouldUnregister: false, defaultValues: { fullName: '', email: '', phone: '', companyName: '', website: '', services: [], notes: '', consent: false } });
  const { formState: { isSubmitting } } = methods;
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return; } heading.current?.focus(); }, [step, result]);
  const reset = () => { methods.reset(); setResult(null); setStep(0); heading.current?.focus(); };
  const advance = async () => { if (await methods.trigger(stepFields[step], { shouldFocus: true })) setStep(step + 1); };
  const submit = methods.handleSubmit(data => setResult(data), errors => {
    const firstStep = stepFields.findIndex(fields => fields.some(field => errors[field]));
    if (firstStep >= 0) {
      setStep(firstStep);
      window.setTimeout(() => { const field = stepFields[firstStep].find(name => errors[name]); if (field) methods.setFocus(field); }, 0);
    }
  });
  return <div className="app-shell">
    <header className="topbar"><a href="./" className="brand" aria-label="Forma home"><span className="brand-mark"><Layers2 size={21} /></span>forma<span className="brand-dot">.</span></a><span className="demo-badge"><span /> INTERACTIVE DEMO</span></header>
    <main className="layout">
      <aside className="sidebar"><div><div className="eyebrow">LET’S MAKE IT HAPPEN</div><h1>A great partnership<br />starts here<span>.</span></h1><p className="intro">A few small details.<br />A world of possibilities.</p></div>
        <nav aria-label="Onboarding progress"><ol className="step-list">{steps.map((item, i) => <li key={item.title} aria-current={!result && step === i ? 'step' : undefined} className={`${step === i && !result ? 'active' : ''} ${step > i || result ? 'complete' : ''}`}><span className="step-number">{step > i || result ? <Check size={18} aria-hidden="true" /> : `0${i + 1}`}</span><div><strong>{item.title}</strong><span>{item.description}</span><span className="sr-only">{step > i || result ? 'Completed' : step === i ? 'Current step' : 'Upcoming'}</span></div></li>)}</ol></nav>
        <div className="sidebar-note"><Sparkles size={22} /><p>Good things start<br />with a conversation.</p><span>Let’s create something meaningful.</span></div>
        <div className="sidebar-bottom"><span className="small-dot" /> ABOUT 3 MINUTES · ALL ABOUT YOU</div>
      </aside>
      <section className="form-panel" aria-label={result ? 'Success summary' : 'Client onboarding'}>
        <div className="panel-top"><span>{result ? 'DEMO COMPLETE' : step === 3 ? 'REVIEW YOUR DETAILS' : `STEP 0${step + 1} OF 03`}</span><button className="reset" type="button" onClick={reset} disabled={isSubmitting}><RotateCcw size={14} /> Reset</button></div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${result || step === 3 ? 100 : (step + 1) / 3 * 100}%` }} /></div>
        {result ? <><div className="success-icon"><CheckCheck size={30} /></div><h2 ref={heading} tabIndex={-1}>You’re all set, {result.fullName.split(' ')[0]}.</h2><p className="subtitle">Your sample onboarding is complete. Here’s your summary.</p><div className="success-notice" role="status">Local demo only. Your data was not sent or stored on a server. It lives only in this page’s memory until you reset or reload.</div><Summary data={result} /><button className="primary mt-6" onClick={reset}>Start again <ArrowRight size={17} /></button></> : <>
          <h2 ref={heading} tabIndex={-1}>{titles[step]}</h2><p className="subtitle">{descriptions[step]}</p>
          <FormProvider {...methods}><form noValidate onSubmit={event => { if (step < 3) { event.preventDefault(); void advance(); } else void submit(event); }}>
            {step === 0 && <PersonalStep />}{step === 1 && <CompanyStep />}{step === 2 && <PreferencesStep />}{step === 3 && <Summary data={methods.getValues()} onEdit={setStep} />}
            <div className="form-actions"><button type="button" className="back" disabled={step === 0 || isSubmitting} onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button><button type="submit" className="primary" disabled={isSubmitting}>{isSubmitting ? 'Completing…' : step === 3 ? 'Submit demo' : step === 2 ? 'Review details' : 'Continue'}<ArrowRight size={17} /></button></div>
          </form></FormProvider>
        </>}
        <div className="privacy"><LockKeyhole size={15} aria-hidden="true" /><p>Local demo only. Data is not actually sent or stored on a server.</p></div>
      </section>
    </main>
    <footer className="footer"><span>© {new Date().getFullYear()} Forma Studio</span><span>A thoughtful start to something great.</span></footer>
  </div>;
}
