export const APARTMENTS = [
  {
    id: 'apt-01',
    title: 'Квартира 1 — Святой Влас',
    type: '2-комнатная',
    floor: 3,
    totalFloors: 4,
    area: 65,
    guests: 4,
    beachMinutes: 3,
    hasPool: false,
    hasParking: true,
    hasAC: true,
    hasWifi: true,
    hasWasher: true,
    hasBalcony: true,
    hasElevator: true,
    noSmoking: true,
    noPets: true,
    minChildAge: 7,
    photos: [
      '/photos/photo_2026-04-02_18-20-55.jpg',
      '/photos/photo_2026-04-02_18-20-46.jpg',
      '/photos/photo_2026-04-02_18-20-52.jpg',
      '/photos/photo_2026-04-02_18-20-39.jpg',
      '/photos/photo_2026-04-02_18-16-40.jpg',
      '/photos/photo_2026-04-02_18-03-51.jpg',
      '/photos/photo_2026-04-02_18-19-22.jpg',
    ],
    priceByMonth: { 5: 55, 6: 70, 7: 95, 8: 100, 9: 65, 10: 40 },
    cleaningFee: 25,
    deposit: 100,
    owner: { name: 'Ольга', photo: '/photos/photo_2025-11-19_18-52-09.jpg', telegram: 'OlgaTurevaSv', phone: '+4917675765576', bookings: 23, verified: true },
    description: 'Новостройка в Святом Власе. 2-комнатная квартира с современным ремонтом, новой мебелью и техникой. 2 спальни, балкон, кондиционер. До пляжа 3 минуты, базар в 50 м, рестораны рядом. Лифт, паркинг.',
    available: true,
  },
  {
    id: 'apt-02',
    title: 'Квартира 2 — Святой Влас',
    type: '2-комнатная',
    floor: 2,
    totalFloors: 4,
    area: 65,
    guests: 4,
    beachMinutes: 3,
    hasPool: false,
    hasParking: true,
    hasAC: true,
    hasWifi: true,
    hasWasher: true,
    hasBalcony: true,
    hasElevator: true,
    noSmoking: true,
    noPets: true,
    minChildAge: 7,
    photos: [
      '/photos/photo_2026-04-02_18-20-39.jpg',
      '/photos/photo_2026-04-02_18-20-43.jpg',
      '/photos/photo_2026-04-02_18-20-52.jpg',
      '/photos/photo_2026-04-02_18-16-47.jpg',
      '/photos/photo_2026-04-02_18-16-51.jpg',
      '/photos/photo_2026-04-02_18-19-25.jpg',
      '/photos/photo_2026-04-02_18-19-28.jpg',
    ],
    priceByMonth: { 5: 55, 6: 70, 7: 95, 8: 100, 9: 65, 10: 40 },
    cleaningFee: 25,
    deposit: 100,
    owner: { name: 'Ольга', photo: '/photos/photo_2025-11-19_18-52-09.jpg', telegram: 'OlgaTurevaSv', phone: '+4917675765576', bookings: 23, verified: true },
    description: 'Новостройка в Святом Власе. 2-комнатная квартира с современным ремонтом, новой мебелью и техникой. 2 спальни, балкон, кондиционер. До пляжа 3 минуты, базар в 50 м, рестораны рядом. Лифт, паркинг.',
    available: true,
  },
]

// Получить цену за ночь по дате
export function getNightPrice(apartment, date) {
  const month = date ? new Date(date).getMonth() + 1 : 7
  return apartment.priceByMonth[month] ?? apartment.priceByMonth[7]
}

// Рассчитать итоговую стоимость
export function calcTotal(apartment, dateFrom, dateTo) {
  if (!dateFrom || !dateTo) return null
  const nights = Math.round((new Date(dateTo) - new Date(dateFrom)) / 86400000)
  if (nights <= 0) return null
  const pricePerNight = getNightPrice(apartment, dateFrom)
  const rent = pricePerNight * nights
  const cleaning = apartment.cleaningFee
  const deposit = apartment.deposit
  return { nights, pricePerNight, rent, cleaning, deposit, total: rent + cleaning + deposit }
}
