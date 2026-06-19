import { useEffect } from 'react';

function CursorSparks() {
    useEffect(() => {
            const symbols = ['×', '+', '·', '×', '+']

    function spawnSparks(e) {
      // Only trigger on the page background, not on links/buttons
      if (e.target !== document.body && e.target.closest('a, button')) return

      const count = 6

      for (let i = 0; i < count; i++) {
        const spark = document.createElement('span')
        spark.className = 'spark'
        spark.textContent = symbols[Math.floor(Math.random() * symbols.length)]

        // Start at cursor position, offset slightly so it's centered
        spark.style.left = e.clientX + 'px'
        spark.style.top  = e.clientY + 'px'

        // Random outward direction for each spark
        const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.5)
        const distance = 30 + Math.random() * 40
        const dx = Math.cos(angle) * distance
        const dy = Math.sin(angle) * distance

        spark.style.setProperty('--dx', dx + 'px')
        spark.style.setProperty('--dy', dy + 'px')

        document.body.appendChild(spark)

        // Remove from DOM after animation finishes
        setTimeout(() => spark.remove(), 620)
      }
    }

    window.addEventListener('click', spawnSparks)
    return () => window.removeEventListener('click', spawnSparks)

    }, [])

    return null
}

export default CursorSparks