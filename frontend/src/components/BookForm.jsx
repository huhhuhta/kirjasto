import { useState } from 'react'
import { GENRES } from '../constants'

const BookForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState(GENRES[0])
  const [read, setRead] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onAdd({ title, author, year: Number(year) || null, genre, read })
    setTitle('')
    setAuthor('')
    setYear('')
    setGenre(GENRES[0])
    setRead(false)
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <label>
        Nimi
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <label>
        Kirjailija
        <input value={author} onChange={e => setAuthor(e.target.value)} required />
      </label>

      <label>
        Julkaisuvuosi
        <input
          type="number"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </label>

      <label>
        Genre
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          {GENRES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label className="checkbox">
        <input type="checkbox" checked={read} onChange={e => setRead(e.target.checked)} />
        Luettu
      </label>

      <button type="submit">Lisää</button>
    </form>
  )
}

export default BookForm
