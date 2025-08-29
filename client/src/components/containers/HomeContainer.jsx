import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function HomeContainer() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch('http://localhost:5539/api/admin/containers') 
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        const result = await res.json()
        if (result.status === 'success') {
          setData(result.container) 
        } else {
          setData([])
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (deleted) {
      setDeleted(false)
      fetchContainer()
    }
  }, [deleted])

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5539/api/admin/deleteContainer/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`)
      }
      setDeleted(true) // perkraus studentų sąrašą
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container-fluid vh-100 bg-primary p-3'>
      <h3>Mano paslaugos</h3>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-success' to='/admin/createContainer'>Pasirinkti paslaugą</Link>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Paslaugos nr:</th>
            <th>Paslaugos pavadinimas</th>
            <th>Paslaugos kategorija</th>
            <th>Paslaugos data</th>
            <th>Paslaugos įvertinimas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((container) => (
            <tr key={container.id}>
              <td>{container.id}</td>
              <td>{container.name}</td>
              <td>{container.category}</td>
              <td>{new Date(container.time).toLocaleString('lt-LT', {
              year: 'numeric',
             month: '2-digit',
              day: '2-digit',
             hour: '2-digit',
            minute: '2-digit',
            hour12: false,
              })}</td>
              <td>{container.rating/10}</td>
          
              <td>
                <Link className='btn mx-2 btn-success' to={`/admin/readContainer/${container.id}`}>Peržiūrėti</Link>
                <Link className='btn mx-2 btn-success' to={`/admin/editContainer/${container.id}`}>Koreguoti </Link>
                <button 
                  onClick={() => handleDelete(container.id)} 
                  className='btn mx-2 btn-danger'
                >
                  Ištrinti 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}