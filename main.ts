import axios from 'axios'
import fs from 'fs'
import path from 'path'

const apiKey = fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('=')[1]

const api = axios.create({
  baseURL: 'https://openrouter.ai/api/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'HTTP-Referer': 'https://aitutor.app',
    'X-Title': 'AiTutor',
    'X-Model': 'openai/gpt-oss-20b:free',
  },
})

export default api