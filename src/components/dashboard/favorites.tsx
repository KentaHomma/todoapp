'use client'

import { useState } from 'react'

export function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  return (
    <section className="favorites-section">
      <h2>お気に入りTODO</h2>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>お気に入りのTODOはありません</p>
        ) : (
          <ul>
            {favorites.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}