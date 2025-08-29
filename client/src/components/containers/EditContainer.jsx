import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router"; // Pakeistas importas

export function EditContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [container, setContainer] = useState({
    name: "",
    category: "",
    time: "",
    rating:""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_container/${id}`);
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.status === "success" && result.container) {
          setContainer(result.container);
        } else {
          setError("Procedure not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch procedure data");
      } finally {
        setLoading(false);
      }
    }
    fetchContainer();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5539/api/admin/edit_container/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(container) 
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
     

      navigate("/admin/containers");
    } catch (err) {
      console.error(err);
      setError("Failed to save container data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target; 
    setContainer((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vh-100 bg-primary p-4">
      <h1>Koreguoti pasirinkimą {id}</h1>
      <Link to="/admin/containers" className="btn btn-success mb-3">Grįžti</Link>

      <form onSubmit={handleSubmit}>
        
   <div className="form-group my-2">
  <label htmlFor="name">Pavadinimas</label>
  <select
    name="name"
    value={container.name}
    onChange={handleChange}
    required
    className="form-control"
  >
    <option value="">Pasirinkite</option>
    <option value="Nagai">Nagai</option>
    <option value="Plaukai">Plaukai</option>
    <option value="Masažas">Masažas</option>
    <option value="Kirpimas">Kirpimas</option>
    <option value="Konsultacija">Konsultacija</option>
  </select>
        </div>
        
            <div className="form-group my-2">
  <label htmlFor="category">Kategorija</label>
  <select
    name="category"
    value={container.category}
    onChange={handleChange}
    required
    className="form-control"
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
  <input
    type="datetime-local"
    id="release_date"
    name="time"
    value={container.time}
    onChange={handleChange}
    className="form-control"
    required
  />
        </div>

          <div className="mb-3">
          <label htmlFor="rating" className="form-label">Įvertinimas</label>
 <input
  type="number"
  id="rating"
  name="rating"
  min="0.1"
  max="5"
  step="0.1"
  className="form-control"
  value={container.rating/10}
  onChange={e =>
    setContainer(prev => ({ ...prev, rating: Number(e.target.value*10) }))
  }
/>
      </div>

        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
