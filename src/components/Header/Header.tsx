import { FC } from 'react'
import './Header.scss'
import { menuConfig } from '../../config/menuConfig'
import { NavLink, useNavigate } from 'react-router-dom'

const Header: FC = () => {
    const navigate = useNavigate()

    return (
        <header className='header'>
            <img 
                src="https://rick-and-morty-project.fly.dev/images/logo.png" 
                alt="logo" 
                className='logo'
                onClick={() => navigate('/')}
            />
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
        </header>
    )
}

export default Header
