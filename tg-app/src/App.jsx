import { useEffect } from 'react'
import useStore from './store/useStore'
import BottomNav from './components/BottomNav'
import SplashScreen from './screens/SplashScreen'
import DatePickerScreen from './screens/DatePickerScreen'
import CatalogScreen from './screens/CatalogScreen'
import ApartmentScreen from './screens/ApartmentScreen'
import BookingsScreen from './screens/BookingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import FAQScreen from './screens/FAQScreen'

const SCREENS_WITH_NAV = ['catalog', 'bookings', 'profile']

export default function App() {
  const { screen, goBack } = useStore()

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return
    const isRoot = screen === 'splash' || screen === 'catalog'
    if (isRoot) {
      tg.BackButton?.hide()
    } else {
      tg.BackButton?.show()
      tg.BackButton?.onClick(goBack)
    }
    return () => tg.BackButton?.offClick(goBack)
  }, [screen, goBack])

  return (
    <>
      <div className="screen">
        {screen === 'splash'    && <SplashScreen />}
        {screen === 'dates'     && <DatePickerScreen />}
        {screen === 'catalog'   && <CatalogScreen />}
        {screen === 'apartment' && <ApartmentScreen />}
        {screen === 'bookings'  && <BookingsScreen />}
        {screen === 'profile'   && <ProfileScreen />}
        {screen === 'faq'       && <FAQScreen />}
      </div>

      {SCREENS_WITH_NAV.includes(screen) && <BottomNav />}
    </>
  )
}
