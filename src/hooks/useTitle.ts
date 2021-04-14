import { useEffect, useRef } from 'react'

function useTitle(title: string) {
  const prevTitleRef = useRef(document.title)
  document.title = title
  useEffect(
    () => () => {
      document.title = prevTitleRef.current
    },
    [],
  )
}

export default typeof document !== 'undefined' && useTitle
