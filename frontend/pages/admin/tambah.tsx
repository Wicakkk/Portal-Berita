import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function TambahBerita() {
  const router = useRouter();

  const [form, setForm] = useState({
    judul: "",
    isi: "",
    kategori: "",
    tanggal: "",
  });
  const [foto, setFoto] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (foto) formData.append("foto", foto);

    await axios.post("http://localhost:3000/berita", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Berita berhasil ditambahkan!");
    router.push("/admin/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Tambah Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="judul"
          placeholder="Judul"
          value={form.judul}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="isi"
          placeholder="Isi berita"
          value={form.isi}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih Kategori</option>
          <option value="Ekonomi & Bisnis">Ekonomi & Bisnis</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Politik">Politik</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
