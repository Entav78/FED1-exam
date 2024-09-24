// Updated fetchData.mjs
export async function fetchData(url, method = 'GET', body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Automatically include the accessToken if available
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  console.log(`Making ${method} request to ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    console.log("Full response object:", response);

    // Parse the response JSON once
    const data = await response.json();

    // Return both response and data for proper handling in the calling function
    return { response, data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


/*
export async function fetchData(url, method = 'GET', body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Automatically include the accessToken if available
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  console.log(`Making ${method} request to ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    console.log("Full response object:", response);

    // Parse the response JSON once
    const data = await response.json();

    // Check for error status and handle it
    if (!response.ok) {
      console.error("Error response from API:", data);
      throw new Error(`Failed to fetch data: ${data.errors?.[0]?.message || response.statusText}`);
    }

    console.log("Parsed response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
*/