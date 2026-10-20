import { useEffect, useState } from "react";
import { getAll, create, update, remove } from "../api.js";

export default function EntityManager({ resource, title, fields }) {
  const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setItems(await getAll(resource));
      setError("");
    } catch {
      setError("Cannot reach the server. Is JSON Server running on port 3001?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const validate = () => {
    for (const f of fields) {
      if (f.required && !form[f.key].trim()) return `${f.label} is required.`;
      if (f.type === "email" && !/^\S+@\S+\.\S+$/.test(form[f.key]))
        return "Please enter a valid email address.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);
    try {
      if (editingId) await update(resource, editingId, form);   // Update
      else await create(resource, form);                        // Create
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, item[f.key]])));
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await remove(resource, id);                               // Delete
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const visible = items.filter((item) =>
    fields.some((f) => String(item[f.key]).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card card-panel">
          <div className="card-body">
            <h5 className="card-title">{editingId ? `Edit ${title}` : `Add ${title}`}</h5>
            <form onSubmit={handleSubmit} noValidate>
              {fields.map((f) => (
                <div className="mb-3" key={f.key}>
                  <label className="form-label">{f.label}</label>
                  <input
                    className="form-control"
                    type={f.type}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button className="btn btn-primary me-2" type="submit">
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => { setEditingId(null); setForm(empty); setError(""); }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card card-panel">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{title} List</h5>
              <input
                className="form-control w-50"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      {fields.map((f) => <th key={f.key}>{f.label}</th>)}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        {fields.map((f) => <td key={f.key}>{item[f.key]}</td>)}
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {visible.length === 0 && (
                      <tr><td colSpan={fields.length + 2} className="text-center text-muted">No records found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
