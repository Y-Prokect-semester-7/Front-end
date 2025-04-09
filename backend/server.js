import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json())

//email and user change
app.post('/api/update-user', async (req, res) => {
  const { user_id, name, email } = req.body
  console.log('Received update-user request:', req.body);
  try {
    const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
    })

    const tokenJson = await tokenRes.json();
    const access_token = tokenJson.access_token;

    


    const updateRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })

    const result = await updateRes.json()
    res.json(result)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

//password change
app.post('/api/change-password', async (req, res) => {
    const { user_id, password } = req.body
  
    if (user_id.startsWith('google-oauth2|')) {
      return res.status(400).json({ error: 'Cannot change password for Google users' })
    }
  
    try {
      const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
          grant_type: 'client_credentials'
        })
      })
      const { access_token } = await tokenRes.json()
  
      const patchRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
  
      const result = await patchRes.json()
      res.json(result)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to change password' })
    }
  })
  
app.listen(3000, () => console.log('✅ Backend running at http://localhost:3000'))
