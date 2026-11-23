import { GENRES } from '../constants'

const Filter = ({ filters, onChange, onClear }) => {
  // Päivittää yhden kentän ja säilyttää muut ennallaan
  const set = (field) => (event) => onChange({ ...filters, [field]: event.target.value })

  return (
    <div className="filter">
      <input
        placeholder="Hae kirjalla tai kirjailijalla"
        value={filters.search}
        onChange={set('search')}
      />

      <select value={filters.genre} onChange={set('genre')}>
        <option value="all">Kaikki genret</option>
        {GENRES.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <input
        type="number"
        className="year"
        placeholder="Vuodesta"
        value={filters.yearFrom}
        onChange={set('yearFrom')}
      />
      <input
        type="number"
        className="year"
        placeholder="Vuoteen"
        value={filters.yearTo}
        onChange={set('yearTo')}
      />

      <select value={filters.read} onChange={set('read')}>
        <option value="all">Kaikki</option>
        <option value="read">Luettu</option>
        <option value="unread">Ei luettu</option>
      </select>

      <button type="button" onClick={onClear}>Tyhjennä</button>
    </div>
  )
}

export default Filter
