export function getWrongSet() {
  if (typeof window === "undefined") return new Set();
  const raw = localStorage.getItem("wrongSet");
  return new Set(raw ? JSON.parse(raw) : []);
}
export function addToWrongSet(id: string | number) {
  const set = getWrongSet();
  set.add(id);
  localStorage.setItem("wrongSet", JSON.stringify([...set]));
}

export function clearWrongSet() {
  localStorage.removeItem("wrongSet");
}