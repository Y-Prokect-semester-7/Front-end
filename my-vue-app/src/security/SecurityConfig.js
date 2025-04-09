import axios from 'axios';

const TOKEN_KEY = 'auth0_token';
const TOKEN_EXP_KEY = 'auth0_token_expiry';

export async function GetToken() {
  const now = Date.now();
  const storedToken = sessionStorage.getItem(TOKEN_KEY);
  const storedExpiry = sessionStorage.getItem(TOKEN_EXP_KEY);

  if (storedToken && storedExpiry && now < parseInt(storedExpiry)) {
    console.log(storedToken);
    return storedToken;
  }

  try {
    const response = await axios.post(
      'https://dev-2zn6n2l3.us.auth0.com/oauth/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'fYLJnq2Jao2IyQjhNF6wmqnbng8Y1rL5',
        client_secret: 'FuyT_qfkuGLDEECInW6EgnqTy1clEa9tSywVEWkl5K0BTsZODV29S9U7dqs7yynO',
        audience: 'https://dev-2zn6n2l3.us.auth0.com/api/v2/'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in || 3600; // default 1 hour

    // Save to sessionStorage
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXP_KEY, (now + expiresIn * 1000).toString());

    console.log('Fetched new token');
    return token;

  } catch (error) {
    console.error('Failed to fetch token:', error);
    return null;
  }
}
