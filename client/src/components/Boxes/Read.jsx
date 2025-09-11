import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"
import defaultImg from '../../assets/default.png';

 export  function Read() {
  const [box, setBox] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBox() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_student/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        setBox(result.box); // vienas objektas
      } catch (err) {
        console.error(err);
      }
    }
    fetchBox();
  }, [id]);

  if (!box) return <p>Loading...</p>;

  return (
    <div className="container-fluid vh-100 bg-primary">
      <h1>Paslauga nr:  {id}</h1>
      <Link to="/admin/students" className="btn btn-success">Grižti</Link>
      <ul className="list-group mt-3">
        <li className="list-group-item"><b>Eilės numeris: </b>{box.id}</li>
        <li className="list-group-item"><b>Paslaugos pavadinimas: </b>{box.name}</li>
        <li className="list-group-item"><b>Paslaugos kategorija: </b>{box.category}</li>
        <li className="list-group-item"><b>Data: </b>{new Date(box.time).toLocaleString('lt-LT', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})}</li>
         <li className="list-group-item"><b>Paveikslėlis: </b><img
          src={box.image ? `http://localhost:5539${box.image}` : defaultImg}
          alt={box.name}
          style={{ height: '5rem', objectFit: 'contain' }}
          onError={(e) => { e.target.src = defaultImg; }}
        /></li>
      </ul>
    </div>
  );
}




