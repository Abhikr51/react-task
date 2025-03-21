import styles from './index.module.css'
import { Outlet } from 'react-router-dom'

const AppContainer = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}

export default AppContainer