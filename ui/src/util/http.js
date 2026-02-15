export async function getResults(request) {
  const response = await fetch("lambda-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  const data = await response.json();
  return data;
}
