import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/berita")
      .then((res) => setBerita(res.data));
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Daftar Berita
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {berita.map((b: any) => (
          <div
            key={b.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {b.foto && (
              <img
                src={`http://localhost:3000${b.foto}`}
                alt={b.judul}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{b.judul}</h2>
              <p className="text-sm text-gray-500">
                {b.kategori} - {b.tanggal}
              </p>
              <p className="mt-2 text-gray-700">{b.isi}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
