import Country from "./Country"

const Content = ({countries, setCountries}) => {

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1 && countries.length <= 10) {
        return (
            <>
                {countries.map((c) => 
                <div key={c.name.common}>
                    <p>{capitalize(c.name.common)}</p>
                    <button onClick={() => setCountries([c])}>show</button>
                </div>)}
            </>
        )      
    } else if (countries.length === 1) {
        
        return (
            <Country currentCountry={countries[0]}/>
        )
    }
}

export default Content