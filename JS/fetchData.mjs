
export async function fetchData(url, method = 'GET', body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 204 || response.status === 404 || response.headers.get('Content-Length') === '0') {
      return { response, data: null };
    }

    const data = await response.json();

    return { response, data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

