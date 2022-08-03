import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'

const App = () => {

  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [formData, setFormData] = useState('')

  const handleFormChange = (event) => {
    setFormData(event.target.value)
  }

  useEffect(() => {
    const temp = [...countries]
    const countryNames = temp.filter((c) => c.name.common.toLowerCase().includes(formData.toLowerCase()))
    setSelectedCountries(countryNames)
  }, [formData])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])


  return (
    <>
      <form>
        <label>find countries </label>
        <input onChange={handleFormChange} />
      </form>
      <Content countries={selectedCountries} setCountries={setSelectedCountries} />
    </>
  )
}

export default App