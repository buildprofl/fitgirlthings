import { useState } from 'react'

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function RSVPForm({ event }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Please enter your name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return setError('Please enter a valid email')
    }

    setStatus('submitting')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'rsvp',
          event,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          notes: form.notes.trim(),
          'bot-field': '',
        }),
      })
      if (!res.ok) throw new Error('Submit failed')
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong. Please try again or email hello@fitgirlthings.com')
    }
  }

  if (status === 'success') {
    return (
      <div className="rsvp-success">
        <span className="badge">✓ You're on the list</span>
        <h3>See you there.</h3>
        <p>
          We'll email you {form.email ? <strong>{form.email}</strong> : 'shortly'} with event details, timing, and what to bring.
        </p>
        <a href="/events" className="text-link">Back to all events</a>
        <style>{`
          .rsvp-success { text-align: center; padding: 2rem 0; }
          .badge {
            display: inline-block;
            padding: 0.4rem 0.85rem;
            background: color-mix(in oklab, #1f7a5c 20%, transparent);
            color: #1f7a5c;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          h3 { font-family: var(--font-serif); font-size: 2rem; margin: 0.5rem 0; }
          p { color: var(--muted); margin: 0.5rem 0 1.5rem; }
        `}</style>
      </div>
    )
  }

  return (
    <form
      className="rsvp-form"
      onSubmit={handleSubmit}
      name="rsvp"
      method="POST"
      data-netlify="true"
      noValidate
    >
      <input type="hidden" name="form-name" value="rsvp" />
      <input type="hidden" name="event" value={event} />
      <p className="sr-only">
        <label>
          Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <label className="field">
        <span>Full name *</span>
        <input type="text" name="name" value={form.name} onChange={update('name')} required disabled={status === 'submitting'} />
      </label>

      <label className="field">
        <span>Email *</span>
        <input type="email" name="email" value={form.email} onChange={update('email')} required disabled={status === 'submitting'} />
      </label>

      <label className="field">
        <span>Phone (optional)</span>
        <input type="tel" name="phone" value={form.phone} onChange={update('phone')} disabled={status === 'submitting'} />
      </label>

      <label className="field">
        <span>Anything to know? (dietary needs, +1, questions)</span>
        <textarea name="notes" rows="3" value={form.notes} onChange={update('notes')} disabled={status === 'submitting'} />
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="button primary full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Reserving…' : 'Reserve my spot'}
      </button>

      <p className="fine-print">You'll receive a confirmation email with details. No spam. Ever.</p>

      <style>{`
        .rsvp-form { display: flex; flex-direction: column; gap: 1rem; }
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field span {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.02em;
        }
        .field input, .field textarea {
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--line-strong);
          background: var(--surface);
          color: var(--text);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .field input:focus, .field textarea:focus {
          border-color: var(--accent-strong);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }
        .field input:disabled, .field textarea:disabled { opacity: 0.7; }
        .form-error { color: #d95d81; margin: 0; font-weight: 600; font-size: 0.9rem; }
        .fine-print { color: var(--muted); font-size: 0.82rem; margin: 0.4rem 0 0; text-align: center; }
      `}</style>
    </form>
  )
}
