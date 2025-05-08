import { FC } from 'react'
import './Layout.scss'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
    return (
        <div className='layout'>
            <Header/>
            <main className='main-content'>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout
