import { checkUserExists } from '../services/authService';

export async function authGuard(isAuthenticated, user) {
  if (!isAuthenticated || !user) return true; // continue

  try {
    const exists = await checkUserExists(user.sub);
    if (!exists) {
      return { path: '/addaccount' }; // redirect
    }
    return true; // allow navigation
  } catch (error) {
    return { path: '/error' }; // redirect on error
  }
}