function GetInTouch() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <p>Get in touch with me. I'll get back to you as soon as I can.</p>
      <form action="">
        <label htmlFor="name">Name
          <input type="text" id="name" placeholder="Your full name" />
        </label>
        <label htmlFor="email">Email
          <input type="email" id="email" placeholder="your@email.com" />
        </label>
        <label htmlFor="phone">Phone
          <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" />
        </label>
        <label htmlFor="message">Message
          <textarea id="message" rows="5" placeholder="What's on your mind?"></textarea>
        </label>
        <button type="submit">Send message</button>
      </form>
    </div>
  )
}

export default GetInTouch