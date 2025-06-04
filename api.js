const AIRTABLE_TOKEN = 'YOUR_TOKEN_HERE';
const AIRTABLE_BASE_ID = 'appnIM6IYJ4unRQQQ';
const AIRTABLE_TABLE_NAME = 'Imported table';

const fetchVotes = async () => {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?sort[0][field]=Votes&sort[0][direction]=desc`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`
    }
  });

  const data = await res.json();
  return data.records;
};

const submitVote = async (recordId, currentVotes) => {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
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
