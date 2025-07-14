import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardAdmin() {
  const router = useRouter();
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
      return;
    }

    axios
      .get("http://localhost:3000/berita")
      .then((res) => setBerita(res.data));
  }, []);

  const hapusBerita = async (id: number) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await axios.delete(`http://localhost:3000/berita/${id}`);
      setBerita(berita.filter((b: any) => b.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/tambah"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Berita
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {berita.map((b: any) => (
          <li key={b.id} className="border p-4 rounded shadow-md bg-white">
            {b.foto && (
              <img
                src={`http://localhost:3000${b.foto}`}
                alt={b.judul}
                className="w-48 mb-2 rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{b.judul}</h2>
            <p className="text-sm text-gray-600">
              {b.kategori} - {b.tanggal}
            </p>
            <div className="mt-2 flex gap-4">
              <Link
                href={`/admin/edit/${b.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => hapusBerita(b.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
