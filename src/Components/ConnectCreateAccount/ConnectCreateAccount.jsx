import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/auth'
import './ConnectCreateAccount.css'
import { toast } from 'react-toastify'

import UserIcon from '../../assets/Images/icons2/User.svg'
import EnvelopeIcon from '../../assets/Images/icons2/EnvelopeSimple.svg'
import LockKeyIcon from '../../assets/Images/icons2/myLockKey.svg'
import ConfirmLockIcon from '../../assets/Images/icons2/LockKey.svg'
import MetamaskIcon from '../../assets/Images/myicones/Metamask.svg'
import WalletConnectIcon from '../../assets/Images/myicones/WalletConnect.svg'
import CoinbaseIcon from '../../assets/Images/myicones/Coinbase.svg'

export default function ConnectCreateAccount({ title, text, creatYs }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleRegister() {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Account created successfully! ')
      navigate('/')

    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='sec-connect-creat-ys'>
      <div className='right-div-connect-creat-ys'>
        <div className='text-sec-connect-creat-ys'>
          <h2 className='text-h2-sec-connect-creat-ys'>{title}</h2>
          <p className='text-p-sec-connect-creat-ys'>{text}</p>
        </div>

        <div className={creatYs ? 'my-div2-connect-creat-ys' : 'my-div2-connect-creat-ys-none'}>
          <div className='div2-connect-creat-ys'>

            <div className='my-div-icon-input-connect-creat-ys'>
              <img className='my-icon-input-connect-creat-ys' src={UserIcon} />
              <input
                className='div-input-connect-creat-ys'
                placeholder='Username'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className='my-div-icon-input-connect-creat-ys'>
              <img className='my-icon-input-connect-creat-ys' src={EnvelopeIcon} />
              <input
                className='div-input-connect-creat-ys'
                placeholder='Email Address'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='my-div-icon-input-connect-creat-ys'>
              <img className='my-icon-input-connect-creat-ys' src={LockKeyIcon} />
              <input
                className='div-input-connect-creat-ys'
                placeholder='Password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className='my-div-icon-input-connect-creat-ys'>
              <img className='my-icon-input-connect-creat-ys' src={ConfirmLockIcon} />
              <input
                className='div-input-connect-creat-ys'
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className='my-btn-connect-creat-ys'
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </div>

        <div className={creatYs ? 'my-div2-connect-creat-ys-none' : 'my-div2-creat-ys'}>
          <div className='my-creat-img-des-ys'>
            <img className='my-creat-img-des-ys-img' src={MetamaskIcon} />
            <h5 className='my-creat-img-des-ys-h5'>Metamask</h5>
          </div>
          <div className='my-creat-img-des-ys'>
            <img className='my-creat-img-des-ys-img' src={WalletConnectIcon} />
            <h5 className='my-creat-img-des-ys-h5'>Wallet Connect</h5>
          </div>
          <div className='my-creat-img-des-ys'>
            <img className='my-creat-img-des-ys-img' src={CoinbaseIcon} />
            <h5 className='my-creat-img-des-ys-h5'>Coinbase</h5>
          </div>
        </div>

      </div>
    </div>
  )
}
