import axios from 'axios'
import React, { useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
    .get(url)
    .then((response) => {
      setData(response)
    })
    .catch((err) => {
      setError(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [url])

  return {data, loading, error}
  
}
