import React from 'react'
import personService from '../services/persons'

const Persons = ({personList, setPersons, newFilter}) => {

    const handleDelete = (id) => {
        if (window.confirm("are you sure you want to delete this?")) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(personList.filter((person) => person.id !== id))
                })
        }
    }

    return <div>{personList.filter((person) => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase())
    }).map((person) => {
        return (
            <div key={"div" + person.id}>
            <p key={"p" + person.id}>{person.name} {person.number}</p>
            <button key={"button" + person.id} onClick={() => handleDelete(person.id)}>delete</button>
            </div>
        )
    })}</div>
}

export default Persons