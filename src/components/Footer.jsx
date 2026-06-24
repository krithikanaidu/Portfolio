import { useState, useEffect } from 'react'
import '../style/Footer.css'

function Footer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <footer className="footer">
      <p>{new Date().getFullYear()} — probably still debugging something</p>
      <p>Thane, India · {formattedTime}</p>
    </footer>
  )
}

export default Footer