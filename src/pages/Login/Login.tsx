import { ChangeEvent, FC, FormEvent, useRef } from 'react'
import { signInConfig } from '../../config/signInConfig'
import { ICredentials, useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

const Login: FC = () => {
    const formData = useRef<ICredentials>({
        login: "",
        password: "",
    })

    const context = useAuthContext()
    const navigate = useNavigate()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        formData.current = {
            ...formData.current,
            [name]: value
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.current.login && formData.current.password) {
            context?.login(
                formData.current.login, 
                formData.current.password
            )
        }
    }

    return (
        <div className='login-page'>
            <div className='form-wrap'>
                <div className='title'>
                    <button 
                        className='btn'
                        onClick={() => navigate(-1)}
                    >
                        &lt; Назад
                    </button>
                    <h3>{signInConfig.title}</h3>
                </div>
                <form 
                    onSubmit={onSubmit}
                    >
                    {signInConfig.fields.map(field => (
                        <input 
                            key={field.id} 
                            type={field.type} 
                            placeholder={field.placeholder}
                            name={field.name}
                            disabled={field.disabled}
                            onChange={onChange}
                        />
                    ))}
                    <button className='btn primary'>
                        {signInConfig.submitLabel}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login
