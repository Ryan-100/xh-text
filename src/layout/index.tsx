import { ProtectedRoute } from '../service/ProtectedRoute'
import RootLayout from './components/layout'

const LayoutIndex = () => {
  return (
    <ProtectedRoute>
         <RootLayout/>
    </ProtectedRoute>
  )
}

export default LayoutIndex
