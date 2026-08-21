import { useState } from 'react'

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function NewsletterForm({ compact = false, source = 'home' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email')
      return
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!valid) {
      setError('Please enter a valid email')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'newsletter',
          email: trimmed,
          source,
          'bot-field': '',
        }),
      })
      if (!res.ok) throw new Error(`Submit failed (${res.status})`)
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong. Please try again or email hello@fitgirlthings.com')
    }
  }

  const busy = status === 'submitting'
  const done = status === 'success'
  const inputId = compact ? 'compact-email' : 'hero-email'

  return (
    <form
      className={`newsletter-form ${compact ? 'compact' : ''}`}
      onSubmit={handleSubmit}
      name="newsletter"
      method="POST"
      data-netlify="true"
      noValidate
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input type="hidden" name="source" value={source} />
      <p className="sr-only">
        <label>
          Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="sr-only" htmlFor={inputId}>Email address</label>
      <div className="form-group">
        <input
          id={inputId}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          aria-label="Email address"
          disabled={busy || done}
          required
        />
        <button type="submit" disabled={busy || done} className="button primary">
          {done ? 'Subscribed ✓' : busy ? 'Sending…' : 'Join the newsletter'}
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">{error}</p>
      )}
      {done && (
        <p className="form-success" role="status">
          ✓ Welcome to the list. Check your inbox for the latest edition.
        </p>
      )}

      <style>{`
        .newsletter-form { display: flex; flex-direction: column; gap: 0.75rem; }
        .newsletter-form.compact { margin-top: 1rem; }
        .form-group { display: flex; gap: 0.6rem; width: 100%; }
        .newsletter-form input[type="email"] {
          flex: 1;
          padding: 1rem 1.1rem;
          border-radius: 14px;
          border: 1px solid var(--line-strong);
          background: var(--surface);
          color: var(--text);
          outline: none;
          font-size: 1rem;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .newsletter-form input[type="email"]:focus {
          border-color: var(--accent-strong);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }
        .newsletter-form input[type="email"]:disabled { opacity: 0.7; cursor: not-allowed; }
        .newsletter-form button {
          border-radius: 14px;
          padding: 1rem 1.5rem;
          white-space: nowrap;
        }
        .newsletter-form button:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-error {
          color: #d95d81;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 600;
        }
        .form-success {
          color: #1f7a5c;
          font-size: 0.95rem;
          margin: 0;
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .form-group { flex-direction: column; }
          .newsletter-form button { width: 100%; }
        }
      `}</style>
    </form>
  )
}
