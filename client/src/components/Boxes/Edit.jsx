
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router"

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [box, setBox] = useState({
    name: "",
    category: "",
    image: "",
    time: ""
  });

  const [loading, setLoading] = useState(true); // įkėlimo būsena
  const [error, setError] = useState(null);     // klaidų būsena

  useEffect(() => {
    async function fetchBox() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_student/${id}`);
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.status === "success" && result.box) {
          setBox(result.box);
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
    fetchBox();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5539/api/admin/edit_user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(box)
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
      

      navigate("/admin/students"); // grįžtam į home po sėkmingo atnaujinimo
    } catch (err) {
      console.error(err);
      setError("Failed to save procedure data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setBox((prev) => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Kraunama...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid vh-100  bg-primary p-4">
      <h1>Koreguoti paslaugą nr:{id}</h1>
      <Link to="/admin/students" className="btn btn-success mb-3">Grižti</Link>

      <form onSubmit={handleSubmit}>
  <div className="form-group my-2">
  <label htmlFor="name">Pavadinimas</label>
  <select
    name="name"
    value={box.name}
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
    value={box.category}
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
  <label htmlFor="release_date" className="form-label">Procedūros data ir laikas</label>
  <input
    type="datetime-local"
    id="release_date"
    name="time"
    value={box.time}
    onChange={handleChange}
    className="form-control"
    required
  />
</div>

         <div className="form-group my-2">
          <label htmlFor="image">Paveikslėlis</label>
          <input
            value={box.image}
            type="text"
            name="image"
            required
            onChange={handleChange}
            className="form-control"
          />

        </div>
        
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Išsaugoti
          </button>
        </div>
      </form>
    </div>
  );
}
