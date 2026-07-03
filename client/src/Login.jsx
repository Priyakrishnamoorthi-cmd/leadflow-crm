import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api/auth'

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = isRegister ? `${API}/register` : `${API}/login`
      const res = await axios.post(url, form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Register' : 'Login'} — LeadFlow CRM 🚀</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <><input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /><br/><br/></>
        )}
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /><br/><br/>
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required /><br/><br/>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}>
        {isRegister ? 'Already have account? Login' : "Don't have account? Register"}
      </p>
    </div>
  )
}

export default Login