import fs from "fs/promises"
import path from "path"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
const TOKEN_PATH = path.join(process.cwd(), "token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

async function listRecentTransaction(auth) {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1mdj7QGLWoRbLCb6mKqlarUeKvhxo5IzryEMCmiLxHss",
    range: "Sheet1!A345:H356",
  })
  const rows = res.data.values
  if (!rows || rows.length === 0) {
    console.log("No data found.")
    return
  }
  console.log("Date, Outbound, Inbound, Balance, From:")
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[6]}`)
  })
}

authorize().then(listRecentTransaction).catch(console.error)
