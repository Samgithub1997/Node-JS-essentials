# 📁 upload-file simulator — Node.js File Upload & Processing Simulator

A lightweight Node.js server that simulates file uploads using streams, decouples post-upload processing via `EventEmitter`, and leverages `setImmediate` for non-blocking operations — demonstrating core Node.js fundamentals.

---

## 🚀 Features

- Raw Node.js HTTP server (no frameworks)
- Simulated file upload via streaming `sample.txt`
- Event-driven processing via `EventEmitter`
- Asynchronous post-upload processing using `setImmediate`
- Simple file analytics (line count)
- Demonstrates `fs`, `stream`, `http`, `events`, and `setImmediate`

---

## 📜 How It Works

1. Client makes a `POST` request to `/upload`.
2. Server begins streaming `sample.txt` to simulate upload.
3. Once upload is complete, a `fileUploaded` event is emitted.
4. A listener for `fileUploaded` kicks in using `setImmediate`.
5. The file is read and processed (count number of lines).
6. Server responds with `"Upload Successful"` after streaming is done.

---

## 🧪 How to Run

```bash
# Clone the repo
cd upload Week\ 1

# Run the server
node upload-file.js

#POSTMAN
POST | http://localhost:3000/upload
```
