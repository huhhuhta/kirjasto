import { useState, useEffect } from 'react'
import bookService from './services/books'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import Filter from './components/Filter'

const emptyFilters = {
  search: '',
  genre: 'all',
  yearFrom: '',
  yearTo: '',
  read: 'all'
}

const App = () => {
  const [books, setBooks] = useState([])
  const [filters, setFilters] = useState(emptyFilters)
  const [error, setError] = useState(null)

  useEffect(() => {
    bookService
      .getAll()
      .then(data => setBooks(data))
      .catch(() => setError('Kirjojen haku epäonnistui'))
  }, [])

  const addBook = (newBook) => {
    bookService
      .create(newBook)
      .then(created => setBooks(books.concat(created)))
      .catch(err => setError(err.response?.data?.error || 'Lisäys epäonnistui'))
  }

  const deleteBook = (id) => {
    const book = books.find(b => b.id === id)
    if (!window.confirm(`Poistetaanko "${book.title}"?`)) return

    bookService
      .remove(id)
      .then(() => setBooks(books.filter(b => b.id !== id)))
      .catch(() => setError('Poistaminen epäonnistui'))
  }

  const toggleRead = (id) => {
    const book = books.find(b => b.id === id)
    bookService
      .update(id, { read: !book.read })
      .then(updated => setBooks(books.map(b => (b.id === id ? updated : b))))
      .catch(() => setError('Päivitys epäonnistui'))
  }

  const booksToShow = books.filter(b => {
    const text = filters.search.toLowerCase()
    const matchesText =
      b.title.toLowerCase().includes(text) || b.author.toLowerCase().includes(text)

    const matchesGenre = filters.genre === 'all' || b.genre === filters.genre

    const matchesYearFrom = filters.yearFrom === '' || (b.year && b.year >= Number(filters.yearFrom))
    const matchesYearTo = filters.yearTo === '' || (b.year && b.year <= Number(filters.yearTo))

    const matchesRead =
      filters.read === 'all' || (filters.read === 'read' ? b.read : !b.read)

    return matchesText && matchesGenre && matchesYearFrom && matchesYearTo && matchesRead
  })

  return (
    <div className="container">
      <h1>Kirjasto</h1>

      {error && (
        <div className="error" onClick={() => setError(null)}>
          {error} (sulje klikkaamalla)
        </div>
      )}

      <h2>Lisää kirja</h2>
      <BookForm onAdd={addBook} />

      <h2>Kirjat ({booksToShow.length})</h2>
      <Filter
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />
      <BookList books={booksToShow} onDelete={deleteBook} onToggleRead={toggleRead} />
    </div>
  )
}

export default App
