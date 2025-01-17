export default async function handler(req, res) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
  
    const url = `https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Wordle data: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in serverless function:", error);
      res.status(500).json({ error: "Failed to fetch Wordle data" });
    }
  }
  