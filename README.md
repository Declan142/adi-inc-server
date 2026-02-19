# Adi Inc Chat Server 💬

Simple chat backend for the Adi Inc website.

## Deploy to Render (Free)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/adi-inc-server.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your GitHub repo
5. Click "Deploy"

### Step 3: Get Your URL
After deploy, you'll get a URL like:
```
https://adi-inc-chat.onrender.com
```

### Step 4: Update Frontend
Edit `index.html` and update the API URL:
```javascript
const API_URL = 'https://adi-inc-chat.onrender.com';
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Check if server is running |
| `/api/messages` | GET | Get all messages |
| `/api/chat` | POST | Send new message |

### POST /api/chat
Request:
```json
{
  "message": "Hello!",
  "user": "visitor"
}
```

Response:
```json
{
  "success": true,
  "id": 1234567890,
  "reply": "Message received!"
}
```

## View Messages

Messages are stored in `messages.json` file.
To view latest messages:
```bash
curl https://adi-inc-chat.onrender.com/api/messages
```

---

**Free tier limits:**
- 512 MB RAM
- Sleeps after 15 min idle (wakes on request)
- 100 GB bandwidth/month
