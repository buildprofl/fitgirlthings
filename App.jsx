import { useMemo, useState } from 'react'
import heroData from './src/data/hero.json'
import feedData from './src/data/feed.json'
import eventsData from './src/data/events.json'
import testimonialsData from './src/data/testimonials.json'

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

const feed = feedData.items
const eventCards = eventsData.items

const partnerPoints = [
  'A premium, wellness-forward female audience',
  'Editorial storytelling before and after the event',
  'High-touch in-person activations with visual payoff',
  'Brand-aligned placements, goodie bags, and recaps',
  'A media + events platform, not just a one-off gathering',
]

const testimonials = testimonialsData.items

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

// Legal Page Components
function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>Fit Girl Things ("we," "us," "our," or "Company") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").</p>

      <h2>2. Information We Collect</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li><strong>Email Address:</strong> When you subscribe to our newsletter, we collect your email address to send you wellness content, updates, and event invitations.</li>
        <li><strong>Contact Information:</strong> When you reach out through our contact form, we may collect your name, email, and message content to respond to your inquiry.</li>
        <li><strong>Event RSVPs:</strong> When registering for events, we collect relevant information needed to confirm your attendance and communicate event details.</li>
      </ul>

      <h3>Information Collected Automatically</h3>
      <ul>
        <li><strong>Browser Data:</strong> We may collect information about your browser type, IP address, referring URL, and pages visited.</li>
        <li><strong>Cookies:</strong> We use cookies to enhance user experience and understand how visitors interact with our Site.</li>
        <li><strong>Analytics:</strong> We use third-party analytics services to track Site performance and user behavior patterns.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use collected information for the following purposes:</p>
      <ul>
        <li>Sending newsletter content, wellness updates, and event information</li>
        <li>Responding to your inquiries and customer service requests</li>
        <li>Personalizing your experience on the Site</li>
        <li>Analyzing Site usage and improving our content</li>
        <li>Complying with legal obligations</li>
        <li>Marketing and promotional communications (with your consent)</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>We do not sell your personal information. We may share data with:</p>
      <ul>
        <li><strong>Service Providers:</strong> Email delivery, analytics, and hosting providers who assist in operating our Site</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
        <li><strong>Business Partners:</strong> With your consent, we may share limited information with event sponsors or partners</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.</p>

      <h2>6. Cookies Policy</h2>
      <p>Our Site uses cookies to enhance functionality. You can control cookie settings through your browser preferences. Disabling cookies may impact Site functionality.</p>

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have rights to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2>8. Contact Us</h2>
      <p>For privacy concerns or data requests, contact us at: <a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a></p>
    </div>
  )
}

function TermsOfService() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Agreement to Terms</h2>
      <p>By accessing and using the Fit Girl Things website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on Fit Girl Things for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
      <ul>
        <li>Modify or copy the materials</li>
        <li>Use the materials for any commercial purpose or for any public display</li>
        <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
        <li>Remove any copyright or other proprietary notations from the materials</li>
        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        <li>Engage in any form of scraping or automated data collection</li>
      </ul>

      <h2>3. Disclaimer</h2>
      <p>The materials on Fit Girl Things are provided on an 'as is' basis. Fit Girl Things makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

      <h2>4. Limitations of Liability</h2>
      <p>In no event shall Fit Girl Things or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Fit Girl Things, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>

      <h2>5. Newsletter Subscription</h2>
      <p>By subscribing to our newsletter, you agree to receive regular email communications from Fit Girl Things about wellness content, events, and updates. You may unsubscribe at any time by following the unsubscribe link in our emails.</p>

      <h2>6. Event Attendance</h2>
      <p>Event registration constitutes acceptance of event terms. Fit Girl Things reserves the right to require valid ID and comply with venue policies. Tickets are non-refundable unless otherwise stated.</p>

      <h2>7. Sponsored Content & Partnerships</h2>
      <p>Some content may include sponsored material or brand partnerships. We disclose such partnerships clearly. Opinions expressed by contributors are their own and do not necessarily reflect Fit Girl Things' views.</p>

      <h2>8. Intellectual Property Rights</h2>
      <p>All content on Fit Girl Things, including text, graphics, logos, images, and software, is the property of Fit Girl Things or its content suppliers and is protected by international copyright laws.</p>

      <h2>9. User-Generated Content</h2>
      <p>If you submit any content, comments, or materials to Fit Girl Things, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute such content.</p>

      <h2>10. Modification of Terms</h2>
      <p>Fit Girl Things may revise these terms at any time without notice. By continuing to use the Site after revisions are made, you agree to the modified terms.</p>

      <h2>11. Contact Information</h2>
      <p>For questions about these terms, contact us at: <a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a></p>
    </div>
  )
}

function CookiePolicy() {
  return (
    <div className="legal-page">
      <h1>Cookie Policy</h1>
      <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and understand how you use Fit Girl Things.</p>

      <h2>2. Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the Site to function properly. They enable core functionality like form submission and security features.</p>

      <h3>Analytics Cookies</h3>
      <p>We use analytics cookies to understand how visitors interact with our Site. This helps us improve content, layout, and functionality.</p>

      <h3>Marketing Cookies</h3>
      <p>These cookies help us deliver personalized content and track the effectiveness of our marketing campaigns.</p>

      <h3>Functional Cookies</h3>
      <p>These cookies remember your preferences to enhance your browsing experience on repeat visits.</p>

      <h2>3. Third-Party Cookies</h2>
      <p>We may use third-party services (e.g., Google Analytics) that place cookies on your device. Review their privacy policies for details on how they handle your data.</p>

      <h2>4. Managing Your Cookie Preferences</h2>
      <p>You can control cookies through your browser settings:</p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Privacy → Clear browsing data</li>
      </ul>

      <h2>5. Disabling Cookies</h2>
      <p>While you may disable cookies, doing so may impact the functionality and user experience of our Site. Some features may not work as intended.</p>

      <h2>6. Cookie Retention</h2>
      <p>Most cookies expire after a set period. Essential cookies remain for the duration of your session, while analytics cookies may persist longer.</p>

      <h2>7. Changes to This Policy</h2>
      <p>We may update this Cookie Policy periodically. Check back regularly for changes.</p>

      <h2>8. Contact Us</h2>
      <p>For questions about our cookie practices, email: <a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a></p>
    </div>
  )
}

function Disclaimer() {
  return (
    <div className="legal-page">
      <h1>Disclaimer</h1>
      <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Health & Wellness Disclaimer</h2>
      <p>The content on Fit Girl Things, including articles, recommendations, and advice, is for informational and educational purposes only. It is not intended as medical advice or a substitute for professional medical consultation.</p>

      <p><strong>Always consult with a qualified healthcare provider, fitness professional, or licensed counselor before:</strong></p>
      <ul>
        <li>Starting a new fitness routine or exercise program</li>
        <li>Making significant dietary changes</li>
        <li>Taking new supplements or products</li>
        <li>Addressing mental health concerns</li>
      </ul>

      <h2>2. No Professional Relationship</h2>
      <p>Reading content on Fit Girl Things does not establish a professional relationship with contributors, experts, or Fit Girl Things itself. Contributors may not have specialized credentials for topics they discuss.</p>

      <h2>3. Product Recommendations</h2>
      <p>Product mentions and recommendations are the opinions of our editorial team. We may receive affiliate commissions for certain product links, which we disclose clearly. Product recommendations are not endorsements of effectiveness or safety.</p>

      <h2>4. Individual Results Vary</h2>
      <p>Results from fitness, wellness, or beauty recommendations vary by individual. What works for one person may not work for another. Success depends on many factors including genetics, lifestyle, consistency, and individual health.</p>

      <h2>5. Third-Party Links</h2>
      <p>Fit Girl Things provides links to external websites and services. We are not responsible for the accuracy, legality, or content of external sites. Review their terms and privacy policies separately.</p>

      <h2>6. Accuracy of Information</h2>
      <p>While we strive for accuracy, we do not guarantee that all information on Fit Girl Things is accurate, complete, or current. The wellness and fitness industry evolves rapidly, and information may become outdated.</p>

      <h2>7. Event Disclaimers</h2>
      <p>Fitness and wellness events carry inherent physical risks. Participants acknowledge these risks and assume full responsibility. Fit Girl Things is not liable for injuries sustained during events.</p>

      <h2>8. Mental Health Resources</h2>
      <p>If you are experiencing mental health challenges, please reach out to a licensed professional:</p>
      <ul>
        <li>National Suicide Prevention Lifeline: 988</li>
        <li>Crisis Text Line: Text HOME to 741741</li>
        <li>NAMI Helpline: 1-800-950-NAMI</li>
      </ul>

      <h2>9. Limitation of Liability</h2>
      <p>Fit Girl Things is not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of or inability to use content on this Site.</p>

      <h2>10. Contact</h2>
      <p>For questions about this disclaimer: <a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a></p>
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="legal-page">
      <h1>Contact & Support</h1>

      <h2>Get in Touch</h2>
      <p>Have questions, feedback, or partnership inquiries? We'd love to hear from you.</p>

      <div className="contact-box">
        <h3>Email</h3>
        <p><a href="mailto:hello@fitgirlthings.com">hello@fitgirlthings.com</a></p>
      </div>

      <div className="contact-box">
        <h3>Social Media</h3>
        <p><a href="https://instagram.com/fit.girl.things" target="_blank" rel="noreferrer">@fit.girl.things on Instagram</a></p>
      </div>

      <h2>For Newsletter & Subscriptions</h2>
      <p>Manage your email preferences directly in our newsletter or contact us for subscription support.</p>

      <h2>For Event Inquiries</h2>
      <p>Questions about upcoming events? Email us with "EVENT INQUIRY" in the subject line.</p>

      <h2>For Partnership & Brand Collaboration</h2>
      <p>Interested in working with Fit Girl Things? Email us with "PARTNERSHIP" in the subject line.</p>

      <h2>For Technical Issues</h2>
      <p>Experiencing issues with the website? Please describe the problem and your browser/device information when reaching out.</p>

      <h2>Response Time</h2>
      <p>We aim to respond to all inquiries within 2-3 business days. During busy periods, responses may take longer.</p>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const year = useMemo(() => new Date().getFullYear(), [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand" href="#" onClick={(e) => { e.preventDefault(); handlePageChange('home') }}>
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
        {currentPage === 'home' ? (
          <>
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
                  src={heroData.mainImage}
                  srcSet={`${heroData.mainImageMobile} 375w, ${heroData.mainImage} 800w`}
                  sizes="(max-width: 820px) 100vw, 50vw"
                  alt={heroData.mainImageAlt}
                  loading="eager"
                  decoding="async"
                />
                <div className="overlay-badge">{heroData.mainImageBadge}</div>
              </div>
              <div className="hero-stack">
                <div className="hero-card small">
                  <img
                    src={heroData.secondaryImage}
                    srcSet={`${heroData.secondaryImageMobile} 300w, ${heroData.secondaryImage} 500w`}
                    sizes="(max-width: 820px) 100vw, 35vw"
                    alt={heroData.secondaryImageAlt}
                    loading="lazy"
                    decoding="async"
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
                  src={feedData.leadStory.image}
                  srcSet={`${feedData.leadStory.imageMobile} 375w, ${feedData.leadStory.image} 900w`}
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt={feedData.leadStory.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <div className="lead-story-copy">
                  <span className="mini-kicker">{feedData.leadStory.kicker}</span>
                  <h3>{feedData.leadStory.title}</h3>
                  <p>{feedData.leadStory.excerpt}</p>
                  <a href="#newsletter" className="text-link">Read more</a>
                </div>
              </article>

              <div className="feed-grid">
                {feed.map((item) => (
                  <article className="feed-card" key={item.title}>
                    <img
                      src={item.image}
                      srcSet={`${item.imageMobile} 320w, ${item.image} 700w`}
                      sizes="(max-width: 820px) 100vw, (max-width: 1080px) 50vw, 33vw"
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
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
                ✦ Join 1,000+ fit girls — no spam, ever.
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
          </>
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy />
        ) : currentPage === 'terms' ? (
          <TermsOfService />
        ) : currentPage === 'cookies' ? (
          <CookiePolicy />
        ) : currentPage === 'disclaimer' ? (
          <Disclaimer />
        ) : currentPage === 'contact' ? (
          <ContactInfo />
        ) : null}
      </main>

      <footer className="footer">
        <div className="container footer-wrap">
          <div>
            <strong>Fit Girl Things</strong>
            <p>Editorial wellness, event culture, and the fit-girl world under one roof.</p>
          </div>
          <div className="footer-links">
            {currentPage === 'home' && (
              <>
                <a href="#about">About</a>
                <a href="#feed">The Feed</a>
                <a href="#events">Events</a>
                <a href="#partners">Partner</a>
              </>
            )}
            <button className="footer-link-btn" onClick={() => handlePageChange('privacy')}>Privacy Policy</button>
            <button className="footer-link-btn" onClick={() => handlePageChange('terms')}>Terms of Service</button>
            <button className="footer-link-btn" onClick={() => handlePageChange('cookies')}>Cookie Policy</button>
            <button className="footer-link-btn" onClick={() => handlePageChange('disclaimer')}>Disclaimer</button>
            <button className="footer-link-btn" onClick={() => handlePageChange('contact')}>Contact</button>
          </div>
          <div>
            <small>© {year} Fit Girl Things. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  )
}
