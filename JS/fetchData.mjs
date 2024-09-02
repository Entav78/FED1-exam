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

    if (!response.ok) {
      // Try parsing the response body to log detailed error information
      const errorData = await response.json().catch(() => ({}));
      console.error("Error response from API:", errorData);
      throw new Error(`Failed to fetch data: ${errorData.errors?.[0]?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Parsed response data:", data);
    return data;
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
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    try {
      console.log(`Making ${method} request to ${url}`);
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
  
      console.log("Full response object:", response);
  
      // Read the response body, even in case of errors
      const responseData = await response.json().catch(() => null); // Safely parse the response body
  
      // Log full parsed response body
      console.log("Parsed response data:", responseData);
  
      if (!response.ok) {
        console.error("Error response from API:", responseData);
        throw new Error(`Failed to fetch data: ${responseData?.errors?.[0]?.message || "Unknown error"}`);
      }
  
      return responseData; // Return the parsed response data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  */