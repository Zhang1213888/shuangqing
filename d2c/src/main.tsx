import './assets/styles/variables.css'
import './assets/styles/global.css'
import { createRoot } from 'react-dom/client'
import { RouterView } from './router'

createRoot(document.getElementById('root')!).render(<RouterView />)
