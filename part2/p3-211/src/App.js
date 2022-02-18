import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

var wantedCountries
var printMsg

const CountryDetails = ({wantedCountry}) => {
  console.log('languages: ',Object.values(wantedCountry.languages))
  
  var languageList = Object.values(wantedCountry.languages)

  return (
    <div>
      <h1> {wantedCountry.name.common} </h1>
      capital {wantedCountry.capital } <br></br>
      area {wantedCountry.area }
      <h2>Languages: </h2>
      <ul>
        {languageList.map(language =>
          <li key = {language}>
            {language}
          </li>
          )}
      </ul>
      <img src = {wantedCountry.flags.png}></img>
    </div>
  )
}

const TooLongList = () => {
  console.log('TooLongList!')
  return(
    <div>
      too many countries, narrow down criteria
    </div>
  )
}

const PrintCountries = ({wantedCountries}) => {
  var flag = false
  const [newCountry,setCountry] = useState([])
  console.log('PrintCountries!')
  const wantedCountry = wantedCountries.length === 1 ? <CountryDetails wantedCountry = {wantedCountries[0]}/> : null
  console.log('wantedCountry: ',wantedCountry)
  
  const handleClick = (countries) => {
    console.log('handle click countries: ',countries)
    if(countries.name !== newCountry.name) {
      setCountry(countries)
    }
  console.log('newcountry: ',newCountry)
    
  }
  return (
    
    <div>
      {wantedCountries.map(countries =>
        <div key = {countries.name.common}> 
          {countries.name.common}
          <button onClick= {() => handleClick(countries)}> Show</button>
          {newCountry.name !== undefined && <CountryDetails wantedCountry={newCountry}/>}
        </div>
      )} 
      {wantedCountry}
      
    </div>
    
  )
}


const App = () => {
  const [newList, setList] = useState([])
  const [newCountry, setCountry] = useState('')
  var countryData = []

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setList(response.data)
      })
  },[])


  console.log('newList:', newList)
  
  
  const handleCountry = (event) => {
    
    setCountry(event.target.value)
    wantedCountries = newList.filter(list => (
      list.name.common.includes(newCountry) || list.name.common.toLowerCase().includes(newCountry) 
    ))
    console.log('inside wantedCountries: ', wantedCountries)
    console.log(wantedCountries.length)
    printMsg = wantedCountries.length > 10 ? <TooLongList/> : <PrintCountries wantedCountries={wantedCountries}/>
  }
  
  console.log('wantedCountries: ', wantedCountries)
  
  
  return (
    <div>
      find countries: 
      <input value = {newCountry} onChange = {handleCountry} />
      <br></br>
      {printMsg}
      newCountry: {newCountry} <br></br>
      
    </div>
  )
}

export default App;
