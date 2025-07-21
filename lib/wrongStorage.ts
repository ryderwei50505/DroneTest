
export function getWrongSet(): Set<string> {
  const raw = localStorage.getItem("wrongSet");
  return new Set(raw ? JSON.parse(raw) : []);
}

export function addToWrongSet(id: string) {
  const set = getWrongSet();
  set.add(id);
  localStorage.setItem("wrongSet", JSON.stringify([...set]));
}

export function clearWrongSet() {
  localStorage.removeItem("wrongSet");
}
