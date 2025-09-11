import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router"

 export  function ReadContainer() {
  const [container, setContainer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchContainer() {
      try {
        const res = await fetch(`http://localhost:5539/api/admin/get_container/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const result = await res.json();
        setContainer(result.container); 
      } catch (err) {
        console.error(err);
      }
    }
    fetchContainer();
  }, [id]);

  if (!container) return <p>Loading...</p>;

  return (
    <div className="container-fluid vh-100 bg-primary">
      <h1>Paslaugos numeris: {id}</h1>
      <Link to="/admin/containers" className="btn btn-success">Grižti</Link>
      <ul className="list-group mt-3">
        <li className="list-group-item"><b>Paslaugos nr: </b>{container.id}</li>
        <li className="list-group-item"><b>Pavadinimas: </b>{container.name}</li>
        <li className="list-group-item"><b>Kategorija: </b>{container.category}</li>
        <li className="list-group-item"><b>Data: </b>{new Date(container.time).toLocaleString('lt-LT', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})}</li>
        <li className="list-group-item"><b>Paslauga įvertinta: </b>{container.rating/10} žvaigždute iš 5 galimų</li>
      </ul>
    </div>
  );
}
