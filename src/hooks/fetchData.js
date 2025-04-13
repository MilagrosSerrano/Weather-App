export const fetchData = async (get, headers) => {
  try {
    const response = await fetch(get, { headers:headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw new Error("Something went wrong, couldn't get the results");
  }
};
