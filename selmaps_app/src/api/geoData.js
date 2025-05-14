const HOST = 'localhost';
const API_URL = `http://${HOST}:3000`;

export async function getHotels() {
  const res = await fetch(`${API_URL}/hotels`);
  return await res.json();
}

export async function getParks() {
  const res = await fetch(`${API_URL}/parks`);
  return await res.json();
}

export async function getAttractions() {
  const res = await fetch(`${API_URL}/attractions`);
  return await res.json();
}