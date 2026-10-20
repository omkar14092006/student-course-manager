// Connectivity layer: talks to JSON Server using fetch
const BASE_URL = "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

export const getAll = (resource) => request(`/${resource}`);                 // GET    Read
export const create = (resource, data) =>
  request(`/${resource}`, { method: "POST", body: JSON.stringify(data) });  // POST   Create
export const update = (resource, id, data) =>
  request(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }); // PUT Update
export const remove = (resource, id) =>
  request(`/${resource}/${id}`, { method: "DELETE" });                      // DELETE Delete
