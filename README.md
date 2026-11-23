# Kirjasto

Selainohjelmoinnin harjoitustyö: kirjaston hallinta (Frontend, Backend).

## Käynnistys

Kaksi terminaalia:

```bash
# 1. Backend (portti 3001)
cd backend
npm install
npm run dev

# 2. Frontend (portti 5173)
cd frontend
npm install
npm run dev
```

Avaa http://localhost:5173

## Rakenne

- `backend/` Express-palvelin, REST API osoitteessa `/api/books`. Kirjat tallentuvat tiedostoon `backend/data/books.json`
- `frontend/` React (Vite). Kehityksessä Vite välittää `/api`-pyynnöt backendille (`vite.config.js`)

## API

| Metodi | Reitti | Kuvaus |
|---|---|---|
| GET | /api/books | Hae kaikki kirjat |
| POST | /api/books | Lisää kirja |
| PUT | /api/books/:id | Päivitä kirja |
| DELETE | /api/books/:id | Poista kirja |
