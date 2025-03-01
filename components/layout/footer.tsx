export default function Footer() {
  return <footer className="mx-6">last updated: {bangkokTime()}</footer>
}

function bangkokTime() {
  return new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Bangkok",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}
