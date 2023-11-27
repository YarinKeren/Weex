import { useState, useEffect, useCallback, useRef } from 'react'
import { ArrowUpward } from '@mui/icons-material'

export function ScrollToTop({ scrollStepInPx = 100, delayInMs = 8.33 }) {
  const [isVisible, setIsVisible] = useState(false)
  const intervalIdRef = useRef(null)

  const scrollStep = useCallback(() => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    } else {
      window.scroll(0, window.pageYOffset - scrollStepInPx)
    }
  }, [scrollStepInPx])

  const scrollToTop = () => {
    intervalIdRef.current = setInterval(scrollStep, delayInMs)
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return isVisible ? (
    <button className='scroll-to-top' onClick={scrollToTop}>
      <ArrowUpward className='icon-up-open' />
    </button>
  ) : null
}
