import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import defaultImg from '../../assets/default.png';

export function Home() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    async function fetchBox() {
      try {
        const res = await fetch('http://localhost:5539/api/admin/students') // pilnas URL su portu
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        const result = await res.json()
        if (result.status === 'success') {
          setData(result.box) // čia dabar masyvas
        } else {
          setData([])
        }
      } catch (err) {
        console.error(err)
      
      }
    }

    if (deleted) {
      setDeleted(false)
      fetchBox()
    }
  }, [deleted])


  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5539/api/admin/delete/${id}`, {
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
      <h3>Visos paslaugos</h3>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-success' to='/admin/create'>Pridėti paslaugas</Link>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Eilės numeris</th>
            <th>Paslaugos pavadinimas</th>
            <th>Paslaugos kategorija</th>
            <th>Data kada norima gauti paslauga</th>
            <th>Paveikslėlis</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((box) => (
            <tr key={box.id}>
              <td>{box.id}</td>
              <td>{box.name}</td>
              <td>{box.category}</td>
              <td>{box.time}</td>
              <td>
              <img
              src={box.image ? `http://localhost:5539${box.image}` : defaultImg}
              alt={box.name}
              style={{ height: '5rem', objectFit: 'contain' }}
              onError={(e) => { e.target.src = defaultImg; }}
              />
              </td>
              <td>
                <Link className='btn mx-2 btn-success' to={`/admin/read/${box.id}`}>Peržiūrėti</Link>
                <Link className='btn mx-2 btn-success' to={`/admin/edit/${box.id}`}>Koreguoti</Link>
                <button 
                  onClick={() => handleDelete(box.id)} 
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