// A use-once client for the capitalization server.
//
// Usage:
//
//   node onetimecapitalizeclient.js 10.0.1.40 'string to capitalize'

import net from "net"

const client = new net.Socket()
client.connect({ port: 59898 }, process.argv[2] ?? "localhost", () => {
  client.write(`${process.argv[3]}\r\n`)
})
client.on("data", (data) => {
  console.log(`Server says: ${data.toString("utf-8")}`)
  client.destroy()
})