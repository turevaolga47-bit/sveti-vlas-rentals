import { create } from 'zustand'

const useStore = create((set) => ({
  // Текущий экран: 'splash' | 'dates' | 'catalog' | 'apartment' | 'bookings' | 'profile'
  screen: 'splash',
  setScreen: (screen) => set({ screen }),

  // История экранов для BackButton
  history: [],
  navigate: (screen) => set((s) => ({
    screen,
    history: [...s.history, s.screen],
  })),
  goBack: () => set((s) => {
    const prev = s.history[s.history.length - 1]
    if (!prev) return s
    return { screen: prev, history: s.history.slice(0, -1) }
  }),

  // Параметры поиска
  dateFrom: null,       // Date
  dateTo: null,         // Date
  guests: 2,
  setDates: (from, to) => set({ dateFrom: from, dateTo: to }),
  setGuests: (n) => set({ guests: n }),

  // Выбранная квартира
  selectedApartment: null,
  setSelectedApartment: (apt) => set({ selectedApartment: apt }),

  // Избранное (локально)
  favorites: [],
  toggleFavorite: (id) => set((s) => ({
    favorites: s.favorites.includes(id)
      ? s.favorites.filter((f) => f !== id)
      : [...s.favorites, id],
  })),
}))

export default useStore
