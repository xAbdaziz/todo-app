export default function getCookie(name: String) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop();
    if (result) {
      return result.split(';').shift();
    }
  }
}