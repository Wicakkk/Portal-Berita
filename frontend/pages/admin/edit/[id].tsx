import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EditBerita() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    judul: "",
    isi: "",
    kategori: "",
    tanggal: "",
  });
  const [fotoLama, setFotoLama] = useState("");
  const [fotoBaru, setFotoBaru] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/berita/${id}`).then((res) => {
        const { judul, isi, kategori, tanggal, foto } = res.data;
        setForm({ judul, isi, kategori, tanggal });
        setFotoLama(foto);
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFotoBaru(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (fotoBaru) formData.append("foto", fotoBaru);

    await axios.put(`http://localhost:3000/berita/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Berita berhasil diperbarui!");
    router.push("/admin/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Berita</h1>
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
        {fotoLama && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Gambar Saat Ini:</p>
            <img
              src={`http://localhost:3000${fotoLama}`}
              alt="Foto lama"
              className="w-48 rounded"
            />
          </div>
        )}
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
