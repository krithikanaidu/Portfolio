import { useState } from 'react'
import '../style/App.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzjkojz'

function GetInTouch() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="contact">
      <h1>Contact</h1>
      <p>Get in touch with me. I'll get back to you as soon as I can.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name
          <input type="text" id="name" name="name" placeholder="Your full name" required />
        </label>
        <label htmlFor="email">Email
          <input type="email" id="email" name="email" placeholder="your@email.com" required />
        </label>
        <label htmlFor="phone">Phone
          <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" />
        </label>
        <label htmlFor="message">Message
          <textarea id="message" name="message" rows="5" placeholder="What's on your mind?" required></textarea>
        </label>
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {status === 'success' && <p className="form-status success">Message sent — thanks!</p>}
        {status === 'error' && <p className="form-status error">Something went wrong. Try emailing me directly.</p>}
      </form>
    </div>
  )
}

export default GetInTouch