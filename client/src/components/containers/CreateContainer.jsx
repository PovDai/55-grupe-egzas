import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Teisingas importas

export function CreateContainer() {
  const [values, setValues] = useState({
    name: '',
    category: '',
    time: '',
    rating:''
  });

  const navigate = useNavigate();



  async function handleSubmit(e) {
    e.preventDefault();

 
    try {
      const res = await fetch('http://localhost:5539/api/admin/add_container', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
    

      navigate('/admin/containers');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='container-fluid vh-100 py-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 bg-white p-4 rounded shadow-sm'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h3>Pasirinkti paslaugas</h3>
            <Link to='/admin/containers' className='btn btn-success'>Grižti</Link>
          </div>

          <form onSubmit={handleSubmit}>
         <div className="form-group my-3">
              <label>Procedūros pavadinimas</label>
              <select
                className="form-select"
                required
                value={values.name}
                onChange={e => setValues({ ...values, name: e.target.value })}
              >
                <option value="">Pasirinkite</option>
                <option value="Nagai">Nagai</option>
                <option value="Plaukai">Plaukai</option>
                <option value="Masažas">Masažas</option>
                <option value="Kirpimas">Masažas</option>
                <option value="Konsultacija">Konsultacija</option>
              </select>
            </div>

             
            <div className="form-group my-3">
              <label>Kategorija</label>
              <select
                className="form-select"
                required
                value={values.category}
                onChange={e => setValues({ ...values, category: e.target.value })}
              >
                <option value="">Pasirinkite</option>
                <option value="Dažymas">Dažymas</option>
                <option value="Lakavimas">Lakavimas</option>
                <option value="Gelinis lakavimas">Gelinis lakavimas</option>
                <option value="Pedikiūras">Pedikiūras</option>
                <option value="Manikiūras">Manikiūras</option>
                <option value="Veido masažas">Veido masažas</option>
                <option value="Kūno masažas">Kūno masažas</option>
              </select>
            </div>
                <div className="mb-3">
                    <label htmlFor="release_date" className="form-label">Procedūros data</label>
              <input onChange={e => setValues({ ...values, time: e.target.value })}
                type="datetime-local"
                className="form-control"
                id="release_date" />
              
            </div>
           <div className="mb-3">
          <label htmlFor="rating" className="form-label">Įvertinimas</label>
          <input
          type="number"
          id="rating"
          name="rating"
           min="1"
            max="5"
            step="0.1"
           className="form-control"
           value={values.rating / 10}
          onChange={e => setValues({ ...values, rating: e.target.value * 10 })}
          />
</div>
            
            <button type='submit' className='btn btn-success my-3'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}