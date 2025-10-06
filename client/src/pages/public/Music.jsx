import React,{useState} from "react";
export function Music() {
  // Dainų sąrašas su pavadinimu ir YouTube embed link
  const songs = [
    {
      title: "Jingle Bells",
      url: "https://www.youtube.com/embed/3PgNPc-iFW8",
    },
  
    {
      title: "Feliz Navidad",
      url: "https://www.youtube.com/embed/xMtuVP8Mj4o",
    },
    {
      title: "All I Want for Christmas",
      url: "https://www.youtube.com/watch?v=aAkMkVFwAoo",
    },
    {
      title: "Last Christmas",
      url: "https://www.youtube.com/embed/E8gmARGvPlI",
    },
  ];

  const [selected, setSelected] = useState(null); // pasirinktai dainai

  return (
    <div className="container py-5">
      <h1 className="text-center text-danger fw-bold mb-4">
        🎄 Šventinė Muzikos Sienelė 🎶
      </h1>

      <div className="row g-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="col-6 col-sm-4 col-md-3 d-flex justify-content-center"
          >
            <div
              className="card music-card text-center shadow-sm"
              onClick={() =>
                setSelected(selected === index ? null : index)
              }
            >
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>
                <span className="music-icon">🎵</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-5 d-flex justify-content-center">
          <div className="embed-responsive embed-responsive-16by9 music-player">
            <iframe
              className="embed-responsive-item"
              src={songs[selected].url}
              title={songs[selected].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}