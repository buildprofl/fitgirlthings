import { useMemo, useState } from 'react'

const featureCards = [
  {
    kicker: "Editor's Note",
    title: "Your one and only source for all things fit in a girl's world",
    text: 'Fitness, wellness, beauty, trends, and community—curated with style, clarity, and a real point of view.',
  },
  {
    kicker: "What's Inside",
    title: "The newsletter girls actually forward to the group chat",
    text: 'Trend breakdowns, wellness picks, event drops, product finds, expert-backed insight, and what is actually worth your time.',
  },
  {
    kicker: "Why It Works",
    title: "An editorial media brand with real-world energy",
    text: 'Fit Girl Things blends digital publishing, city-based events, community culture, and sponsor-ready experiences.',
  },
]

const feed = [
  {
    category: 'Wellness',
    title: 'Lazy Fit Girl Smoothies That Still Get the Job Done',
    excerpt: 'Quick blends for busy mornings, post-class recovery, and low-effort wellness days.',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Culture',
    title: 'Matcha, Pilates, Recovery Clubs, and the New Fit-Girl Social Life',
    excerpt: 'The social layer behind modern wellness and why community is becoming the real status symbol.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Fitness',
    title: 'This or That: Pilates Princess, Studio Loyalist, or Outdoor Sweat Girl',
    excerpt: 'Interactive editorial that lets readers see themselves in the brand and share it with friends.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Events',
    title: 'Fit Girl Walk Club: Coffee First, Steps Second, Good Vibes Always',
    excerpt: 'Community events designed to feel easy, chic, social, and impossible to skip.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Beauty',
    title: 'Post-Workout Glow, But Elevated',
    excerpt: 'Recovery rituals, beauty treatments, and simple upgrades that actually fit an active lifestyle.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Found',
    title: 'The Finds of the Month Worth Trying',
    excerpt: 'Products, experiences, and little luxuries the fit girls are talking about right now.',
    image: 'https://images.unsplash.com/photo-1506629905607-c52b46cdbd39?auto=format&fit=crop&w=900&q=80',
  },
]

const eventCards = [
  {
    date: 'May 22',
    title: 'The White Lotus Social',
    place: 'Moxy South Beach Rooftop',
    summary: 'An iconic VIP affair with resort energy, polished visuals, and high-touch brand moments.',
  },
  {
    date: 'Oct 11',
    title: 'Fit Girl Walk Club',
    place: 'North Miami',
    summary: 'Coffee, movement, social time, and a format that turns simple community into real loyalty.',
  },
  {
    date: 'Next Drop',
    title: 'Recovery House Morning',
    place: 'Miami',
    summary: 'Sauna, cold plunge, expert chat, and editorial content designed for both attendance and shareability.',
  },
]

const partnerPoints = [
  'A premium, wellness-forward female audience',
  'Editorial storytelling before and after the event',
  'High-touch in-person activations with visual payoff',
  'Brand-aligned placements, goodie bags, and recaps',
  'A media + events platform, not just a one-off gathering',
]

const testimonials = [
  {
    quote: "This is the newsletter I forward to my group chat every week.",
    author: "Sarah M.",
    role: "Fitness Enthusiast"
  },
  {
    quote: "Finally, wellness content that doesn't feel generic. It's smart, curated, and actually worth my time.",
    author: "Jessica R.",
    role: "Wellness Coach"
  },
  {
    quote: "The events are incredible. Real community, real energy, real connections with like-minded women.",
    author: "Amanda T.",
    role: "Event Attendee"
  }
]

function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setSubmitted(true)
    setTimeout(() => {
      setEmail('')
    }, 2000)
  }

  return (
    <form className={`newsletter-form ${compact ? 'compact' : ''}`} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={compact ? 'compact-email' : 'hero-email'}>
        Email address
      </label>
      <div className="form-group">
        <input
          id={compact ? 'compact-email' : 'hero-email'}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          aria-label="Email address"
          disabled={submitted}
        />
        <button type="submit" disabled={submitted}>
          {submitted ? 'Subscribed!' : 'Join the newsletter'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
      {submitted && (
        <p className="form-success">
          ✓ Welcome to the list! Check your inbox for our latest edition.
        </p>
      )}
    </form>
  )
}

function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-header ${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand" href="#top">
            <span className="brand-mark">FGT</span>
            <span className="brand-text">
              <strong>Fit Girl Things</strong>
              <small>Editorial Wellness Collective</small>
            </span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <a href="#about">About</a>
            <a href="#feed">The Feed</a>
            <a href="#events">Events</a>
            <a href="#partners">Partner</a>
            <a href="#contact">Contact</a>
            <a className="nav-cta" href="#newsletter">Join the list</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">The fit-girl world, edited well</span>
              <h1>The editorial home for women who live wellness with taste.</h1>
              <p className="hero-lead">
                Fit Girl Things is where fitness, beauty, culture, events, and community come
                together. Think premium newsletter energy, city-girl wellness, and the kind of
                content that actually gets shared.
              </p>

              <div className="hero-actions">
                <a href="#newsletter" className="button primary">Join the newsletter</a>
                <a href="#feed" className="button secondary">Read the feed</a>
              </div>

              <div className="hero-proof">
                <div>
                  <strong>1K+</strong>
                  <span>wellness-forward women reached</span>
                </div>
                <div>
                  <strong>Sold out</strong>
                  <span>event energy built for demand</span>
                </div>
                <div>
                  <strong>Digital + IRL</strong>
                  <span>media brand meets community</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card main">
                <img
                  src="https://images.unsplash.com/photo-1518310952931-b1de897abd40?auto=format&fit=crop&w=1100&q=80"
                  alt="Women in an elegant fitness and wellness setting"
                />
                <div className="overlay-badge">Miami editorial energy</div>
              </div>
              <div className="hero-stack">
                <div className="hero-card small">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                    alt="Wellness lifestyle editorial"
                  />
                </div>
                <div className="hero-note">
                  <span className="eyebrow">Here's the tea</span>
                  <p>
                    What is worth it. What is not. What the fit girls are actually doing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-strip">
          <div className="marquee-track">
            <span>Newsletter-first</span>
            <span>Editorial beauty</span>
            <span>Fitness culture</span>
            <span>Wellness trends</span>
            <span>Community events</span>
            <span>Brand collaborations</span>
            <span>Miami energy</span>
            <span>Newsletter-first</span>
            <span>Editorial beauty</span>
            <span>Fitness culture</span>
            <span>Wellness trends</span>
          </div>
        </section>

        <section className="features section">
          <div className="container">
            <SectionHeader
              eyebrow="Built from the brand"
              title="Not another fitness site. A media-driven wellness world."
              text="The Canva brand language points to one clear direction: editorial magazine first, community platform second, sponsor-ready event brand third."
            />
            <div className="feature-grid">
              {featureCards.map((card) => (
                <article className="feature-card" key={card.title}>
                  <span className="mini-kicker">{card.kicker}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about section soft">
          <div className="container about-grid">
            <div>
              <SectionHeader
                eyebrow="About the collective"
                title="For the girls who want substance, style, and a better filter on wellness."
                text="Fit Girl Things speaks to women who train, recover, experiment, socialize, and want a trusted source that feels chic instead of generic."
              />
              <div className="about-copy">
                <p>
                  This brand sits at the intersection of editorial content, beauty-conscious
                  wellness, and in-person event culture. It is for the girl who wants to know
                  which class is worth booking, which product is worth buying, and where the next
                  good gathering is.
                </p>
                <p>
                  The tone is polished, playful, feminine, current, and selective. Not clinical.
                  Not bro fitness. Not generic wellness fluff.
                </p>
              </div>
            </div>

            <div className="about-panel">
              <h3>What readers come for</h3>
              <ul>
                <li>Wellness trends with better taste</li>
                <li>Editorial picks and monthly finds</li>
                <li>Event drops and real-world community</li>
                <li>Expert-backed insight without the lecture</li>
                <li>Beauty, recovery, movement, and lifestyle in one place</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="feed" className="feed section">
          <div className="container">
            <SectionHeader
              eyebrow="The Feed"
              title="Editorial magazine energy, structured for growth."
              text="The site leads with stories, categories, and repeatable content formats that can scale into a true publication."
            />

            <div className="feed-layout">
              <article className="lead-story">
                <img
                  src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Editorial beauty and wellness lead story"
                />
                <div className="lead-story-copy">
                  <span className="mini-kicker">Lead Story</span>
                  <h3>The New Rules of Fit-Girl Culture</h3>
                  <p>
                    Today's wellness girl wants beauty, movement, recovery, social life, and
                    smarter recommendations in one editorial ecosystem. That is the gap this brand
                    fills.
                  </p>
                  <a href="#newsletter" className="text-link">Read more</a>
                </div>
              </article>

              <div className="feed-grid">
                {feed.map((item) => (
                  <article className="feed-card" key={item.title}>
                    <img src={item.image} alt={item.title} />
                    <div className="feed-card-copy">
                      <span className="mini-kicker">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <a href="#newsletter" className="text-link">Open story</a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="newsletter" className="newsletter section blush">
          <div className="container newsletter-wrap">
            <div>
              <span className="eyebrow">Newsletter</span>
              <h2>The issue everyone wants before the event sells out.</h2>
              <p>
                Weekly or biweekly drops covering wellness culture, event invitations, beauty
                recommendations, fit-girl edits, trend breakdowns, and what to try next.
              </p>
            </div>
            <div className="newsletter-panel">
              <NewsletterForm />
              <p className="micro-copy">
                Replace this with Beehiiv, ConvertKit, or your preferred CRM embed when ready.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials section">
          <div className="container">
            <SectionHeader
              align="center"
              eyebrow="What readers say"
              title="Already loved by the fit-girl community"
            />
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.author}>
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="events section">
          <div className="container">
            <SectionHeader
              eyebrow="Events"
              title="Built for attendance, exposure, and better brand moments."
              text="The events strategy is not separate from the magazine. It powers the content, the social proof, and the sponsor value."
            />
            <div className="events-grid">
              {eventCards.map((event) => (
                <article className="event-card" key={event.title}>
                  <div className="event-date">{event.date}</div>
                  <div className="event-copy">
                    <h3>{event.title}</h3>
                    <span>{event.place}</span>
                    <p>{event.summary}</p>
                    <a href="#contact" className="text-link">Request details</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="partners" className="partners section soft">
          <div className="container partners-grid">
            <div>
              <SectionHeader
                eyebrow="Partner with us"
                title="A better platform for corporate wellness, sponsorships, and beautiful exposure."
                text="This brand can monetize through newsletter reach, branded activations, event production, and curated sponsor visibility."
              />
              <ul className="partner-list">
                {partnerPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="partner-panel">
              <span className="mini-kicker">Best fit clients</span>
              <h3>Brands, wellness operators, hospitality groups, and corporate event buyers</h3>
              <p>
                Position Fit Girl Things as both a media brand and an activation partner. That
                means more exposure, more event attendance, and more corporate clients hiring the
                brand to create on-message wellness experiences.
              </p>
              <a href="#contact" className="button primary full">Inquire about partnerships</a>
            </div>
          </div>
        </section>

        <section className="quote-banner section">
          <div className="container quote-inner">
            <span className="eyebrow">Brand line</span>
            <h2>
              Your exclusive pass to the fittest, finest, and most in-the-know space on the
              internet.
            </h2>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container contact-grid">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title="Let's grow the list, fill the room, and build the right brand collaborations."
                text="Use this section for readers, event RSVPs, corporate wellness inquiries, sponsor asks, or media introductions."
              />
              <div className="contact-links">
                <a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a>
                <a href="https://instagram.com/fit.girl.things" target="_blank" rel="noreferrer">
                  @fit.girl.things
                </a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Quick inquiry</h3>
              <p>
                For launch speed, route all interest through one inbox. Segment later by event,
                sponsor, press, and newsletter.
              </p>
              <NewsletterForm compact />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-wrap">
          <div>
            <strong>Fit Girl Things</strong>
            <p>Editorial wellness, event culture, and the fit-girl world under one roof.</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#feed">The Feed</a>
            <a href="#events">Events</a>
            <a href="#partners">Partner</a>
          </div>
          <div>
            <small>© {year} Fit Girl Things. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  )
}
