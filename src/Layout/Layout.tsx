import { FC, Suspense } from 'react'
import './Layout.scss'
import Header from '@shared/components/Header/Header'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
    return (
        <div className='layout'>
            <Header/>
            <main className='main-content'>
                <Suspense fallback={"Loading..."}>
                    <Outlet/>
                </Suspense>
            </main>
        </div>
    )
}

export default Layout
