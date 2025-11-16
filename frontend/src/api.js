export async function fetchAnalysis() {
const res = await fetch('http://localhost:5000/api/analyze');
return res.json();
}