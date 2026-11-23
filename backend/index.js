const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(__dirname, 'data', 'books.json')

// Kirjojen luku
const loadBooks = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch (err) {
    console.log('books.json ei löytynyt tai se on virheellinen. Aloitetaan tyhjällä listalla')
    return []
  }
}

// Kirjojen tallennus
const saveBooks = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), 'utf-8')
}

let books = loadBooks()

const generateId = () => {
  const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0
  return maxId + 1
}

const validate = (body) => {
  if (!body.title || !body.title.trim()) return 'Nimi puuttuu'
  if (!body.author || !body.author.trim()) return 'Kirjailija puuttuu'
  return null
}

app.get('/api/books', (request, response) => {
  response.json(books)
})

app.post('/api/books', (request, response) => {
  const body = request.body
  const error = validate(body)
  if (error) {
    return response.status(400).json({ error })
  }

  const book = {
    id: generateId(),
    title: body.title.trim(),
    author: body.author.trim(),
    year: Number(body.year) || null,
    genre: body.genre || 'Muu',
    read: Boolean(body.read)
  }

  books = books.concat(book)
  saveBooks()
  response.status(201).json(book)
})

app.put('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  const existing = books.find(b => b.id === id)
  if (!existing) {
    return response.status(404).json({ error: 'Kirjaa ei löytynyt' })
  }

  const updated = { ...existing, ...request.body, id }
  books = books.map(b => (b.id === id ? updated : b))
  saveBooks()
  response.json(updated)
})

app.delete('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  books = books.filter(b => b.id !== id)
  saveBooks()
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`)
})
