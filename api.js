export async function handler(request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = "appnIM6IYJ4unRQQQ";
  const tableName = "Imported table";

  const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?sort[0][field]=ID`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    }
  });
}
