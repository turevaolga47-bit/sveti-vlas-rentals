// =============================================
// Apartment Rentals — Sveti Vlas TMA
// Точка входа
// =============================================

const tg = window.Telegram.WebApp;

// 1. Сразу сообщаем Telegram что приложение готово (убирает белую вспышку)
tg.ready();

// 2. Разворачиваем на весь экран
tg.expand();

// 3. Логируем платформу для отладки
console.log('TMA запущен:', {
  platform: tg.platform,
  version:  tg.version,
  theme:    tg.colorScheme,
  user:     tg.initDataUnsafe?.user?.first_name ?? 'гость',
});

// TODO: Итерация 1 — подключить роутер и экраны
// TODO: Итерация 2 — каталог с API
// TODO: Итерация 3 — галерея + детальная страница
// TODO: Итерация 4 — форма бронирования (3 шага)
// TODO: Итерация 5 — Telegram Payments
