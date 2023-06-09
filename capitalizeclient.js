// A client for the capitalization server. After connecting, every line
// sent to the server will come back capitalized.
//
// Use interactively:
//
//   node capitalizeclient.js 10.0.1.40
//
// Or pipe in a file to be capitalized:
//
//   node capitalizeclient.js 10.0.1.40 < myfile

import net from "net"
import readline from "readline"

const client = new net.Socket()
client.connect(59898, process.argv[2] ?? "localhost", () => {
  console.log("Connected to server")
})
client.on("data", (data) => {
  console.log(data.toString("utf-8"))
})

const reader = readline.createInterface({ input: process.stdin })
reader.on("line", (line) => {
  client.write(`${line}\n`)
})
reader.on("close", () => {
  client.end()
})