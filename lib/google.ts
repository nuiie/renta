import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY // Store API key in .env.local
    const sheetId = "1mdj7QGLWoRbLCb6mKqlarUeKvhxo5IzryEMCmiLxHss" // Replace with your actual Google Sheet ID
    const range = "Sheet1!A2:H" // Change to match your range

    if (!apiKey) {
      return res.status(500).json({ error: "Google Sheets API key is missing" })
    }

    const sheets = google.sheets({ version: "v4", auth: apiKey })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    })

    res.status(200).json({ data: response.data.values || [] })
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error)
    res.status(500).json({ error: "Failed to fetch data from Google Sheets" })
  }
}
