import axios from 'axios';

export async function checkUserExists(auth0Id) {
  try {
    const response = await axios.get(`https://twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/user/exists/${encodeURIComponent(auth0Id)}`);
    console.log('User existence check response:', response.data);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
}
