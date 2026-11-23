'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export type Field =
  | {
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'url';
      required?: boolean;
      placeholder?: string;
      half?: boolean;
    }
  | {
      name: string;
      label: string;
      type: 'select';
      required?: boolean;
      placeholder?: string;
      half?: boolean;
      options: string[];
    }
  | {
      name: string;
      label: string;
      type: 'textarea';
      required?: boolean;
      placeholder?: string;
      half?: boolean;
    };

type SubmitFormProps = {
  table: string;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  consentLabel: string;
  hidden?: Record<string, string>;
};

const inputClass =
  'w-full rounded-xl border border-input bg-bark px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

export function SubmitForm({
  table,
  fields,
  submitLabel,
  successTitle,
  successBody,
  consentLabel,
  hidden,
}: SubmitFormProps) {
  const initial: Record<string, string> = {};
  fields.forEach((f) => (initial[f.name] = ''));
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');
    const payload: Record<string, unknown> = { ...hidden };
    fields.forEach((f) => {
      payload[f.name] = values[f.name].trim();
    });
    payload.consent = consent;
    const { error } = await supabase.from(table).insert(payload);
    if (error) {
      setErrorMsg(error.message);
      setState('error');
    } else {
      setState('done');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-gold/40 bg-gold/5 px-8 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
          {successTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
          {successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.half ? 'sm:col-span-1' : 'sm:col-span-2'}
          >
            <label
              htmlFor={`${table}-${field.name}`}
              className="mb-2 block text-sm font-medium text-cream/80"
            >
              {field.label}
              {field.required && <span className="text-gold"> *</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={`${table}-${field.name}`}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => set(field.name, e.target.value)}
                className={inputClass}
              />
            ) : field.type === 'select' ? (
              <select
                id={`${table}-${field.name}`}
                required={field.required}
                value={values[field.name]}
                onChange={(e) => set(field.name, e.target.value)}
                className={inputClass}
              >
                <option value="">{field.placeholder ?? 'Select…'}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${table}-${field.name}`}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => set(field.name, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bark/60 px-4 py-3.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4a94e]"
          required
        />
        <span className="text-sm leading-relaxed text-cream/70">
          {consentLabel}
        </span>
      </label>

      {state === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Something went wrong sending your message. Please check your
          details and try again.
          {errorMsg ? null : null}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-espresso shadow-md shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg disabled:opacity-60 sm:w-auto"
      >
        {state === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
