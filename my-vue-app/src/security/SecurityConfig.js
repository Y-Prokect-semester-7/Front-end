const TOKEN_KEY = 'auth0_token';
const TOKEN_EXP_KEY = 'auth0_token_expiry';

/**
 * @param {Function} getAccessTokenSilently
 * @returns {Promise<string|null>}
 */
export async function GetToken(getAccessTokenSilently) {
  const now = Date.now();
  const storedToken = sessionStorage.getItem(TOKEN_KEY);
  const storedExpiry = sessionStorage.getItem(TOKEN_EXP_KEY);

  if (storedToken && storedExpiry && now < parseInt(storedExpiry)) {
    console.log("🧠 Returning cached token");
    return storedToken;
  }

  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://dev-2zn6n2l3.us.auth0.com/api/v2/',
      }
    });

    const expiresIn = 3600;

    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXP_KEY, (now + expiresIn * 1000).toString());

    console.log("🔐 Fetched new secure user token");
    return token;

  } catch (err) {
    console.error("❌ Failed to fetch user token:", err);
    return null;
  }
}
