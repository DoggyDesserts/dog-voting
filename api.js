const baseId = "appnIM6IYJ4unRQQQ"; // Your Airtable base ID
const tableName = "Imported table"; // Exact table name
const token = import.meta.env.VITE_AIRTABLE_TOKEN;

const fetchVotes = async () => {
  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?sort[0][field]=Votes&sort[0][direction]=desc`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  return data.records;
};

const submitVote = async (recordId, currentVotes) => {
  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        Votes: currentVotes + 1
      }
    })
  });

  const updated = await res.json();
  return updated;
};

export { fetchVotes, submitVote };
