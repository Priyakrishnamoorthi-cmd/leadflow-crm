import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API = 'http://localhost:5000/api/leads'

function App() {
  const [leads, setLeads] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', status: 'New', notes: ''
  })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const res = await axios.get(API)
    setLeads(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await axios.put(`${API}/${editId}`, form)
      setEditId(null)
    } else {
      await axios.post(API, form)
    }
    setForm({ name: '', email: '', phone: '', company: '', status: 'New', notes: '' })
    fetchLeads()
  }

  const handleEdit = (lead) => {
    setForm(lead)
    setEditId(lead._id)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchLeads()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>LeadFlow CRM 🚀</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Name*" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /><br/><br/>
        <input placeholder="Email*" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /><br/><br/>
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /><br/><br/>
        <input placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /><br/><br/>
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
          <option>Lost</option>
        </select><br/><br/>
        <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /><br/><br/>
        <button type="submit">{editId ? 'Update Lead' : 'Add Lead'}</button>
        {editId && <button onClick={() => setEditId(null)}>Cancel</button>}
      </form>

      <h2>All Leads ({leads.length})</h2>
      {leads.map(lead => (
        <div key={lead._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <b>{lead.name}</b> — {lead.email} — {lead.company}<br/>
          Status: <b>{lead.status}</b> | {lead.phone}<br/>
          Notes: {lead.notes}<br/>
          <button onClick={() => handleEdit(lead)}>Edit</button>
          <button onClick={() => handleDelete(lead._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App