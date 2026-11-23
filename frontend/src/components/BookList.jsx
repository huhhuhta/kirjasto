const BookList = ({ books, onDelete, onToggleRead }) => {
  if (books.length === 0) {
    return <p>Ei kirjoja.</p>
  }

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Kirjailija</th>
          <th>Vuosi</th>
          <th>Genre</th>
          <th>Luettu</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.id} className={book.read ? 'read' : ''}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book.genre}</td>
            <td>
              <input
                type="checkbox"
                checked={book.read}
                onChange={() => onToggleRead(book.id)}
              />
            </td>
            <td>
              <button className="danger" onClick={() => onDelete(book.id)}>Poista</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookList
