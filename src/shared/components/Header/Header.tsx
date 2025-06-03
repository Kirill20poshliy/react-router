import { FC } from 'react'
import './Header.scss'
import { menuConfig } from '@config/menuConfig'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@context/AuthContext'
import logo from '../../assets/Rick_and_Morty.svg.png'

const Header: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const context = useAuthContext()

    return (
        <header className='header'>
            <div className='navigate'>
                <img 
                    src={logo}
                    alt="logo" 
                    className='logo'
                    onClick={() => navigate('/')}
                />
                {context?.isAuth && (
                    <nav>
                        {
                            menuConfig.map(link => (
                                <NavLink 
                                    key={link.id} 
                                    to={link.link} 
                                    className="navlink"
                                >
                                    {link.label}
                                </NavLink>
                            ))
                        }
                    </nav>

                )}
            </div>
            {context?.isAuth ? (
                <button 
                    className='btn primary'
                    onClick={() => context.logout()}
                >
                    Выйти
                </button>
            ) : (location.pathname !== '/signin') && (
                <button 
                    onClick={() => navigate('/signin')}
                    className='btn primary'
                >
                    Войти
                </button>
            )}
        </header>
    )
}

export default Header
