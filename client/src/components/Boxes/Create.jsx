import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import defaultImg from '../../assets/default.png';

export function Create() {
  const [img, setImg] = useState(''); // rodomas src (vietinis ar serverio)
  const [localPreview, setLocalPreview] = useState(null); // tik vietinis preview
  const [imgErr, setImgErr] = useState('');
  const [uploading, setUploading] = useState(false);

  const [values, setValues] = useState({
    name: '',
    category: '',
    image: '', // serverio path
    time: '',
  });

  const navigate = useNavigate();

  async function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    setImgErr('');

    // 🔹 Sukuriam vietinį preview
    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    setImg(preview); // rodom local preview
    setUploading(true);

    // Automatiškai atlaisvinti URL po 1 min
    setTimeout(() => {
      URL.revokeObjectURL(preview);
    }, 60000);

    // 🔹 Upload į serverį
    const formData = new FormData();
    formData.append('img', file);

    try {
      const res = await fetch('http://localhost:5539/api/admin/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      setUploading(false);

      if (data.status === 'success') {
        const serverImage = 'http://localhost:5539' + data.msg;
        setValues(prev => ({ ...prev, image: data.msg }));

      
      } else {
        setImgErr(data.msg);
      }
    } catch (err) {
      console.error(err);
      setImgErr('Įvyko klaida įkeliant paveikslėlį.');
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5539/api/admin/add_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      

      navigate('/admin/students');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-fluid vh-120 py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 bg-white p-4 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Pridėti procedūra</h3>
            <Link to="/admin/students" className="btn btn-success">Grižti</Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Image Preview & Upload */}
            <div className="form-group my-3 text-center">
              <img
                className="d-block w-100 object-fit-contain mb-2"
                style={{ height: '20rem', backgroundColor: '#eee' }}
                src={img || defaultImg}
                alt="Preview"
              />
              <input
                type="file"
                className={"form-control" + (imgErr ? ' is-invalid' : '')}
                name="img"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="invalid-feedback">{imgErr}</div>
              {uploading && <div className="text-muted mt-1">Uploading...</div>}
            </div>

      
            {/* Serverio Image path (tik readOnly) */}
            <div className="form-group my-3">
              <label>Paveiksliuko kelias</label>
              <input
                className="form-control"
                readOnly
                value={values.image}
              />
            </div>

            
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
  <label htmlFor="release_date" className="form-label">Procedūros data ir laikas</label>
  <input
    onChange={e => setValues({ ...values, time: e.target.value })}
    type="datetime-local"
    className="form-control"
    id="release_date"
    name="time"
    value={values.time}
    required
  />
</div>

            <button type="submit" className="btn btn-success my-3 w-100">Išsaugoti</button>
          </form>
        </div>
      </div>
    </div>
  );
}