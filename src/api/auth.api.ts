type Role = 'admin' | 'user';
export interface SessionUser { username: string; role: Role }
export interface RegisterPayload { nombres: string; apellidos: string; email: string; password: string }

const SESSION_KEY = 'userData';
const USERS_KEY = 'registeredUsers';

const adminAccounts = [
  { email: 'admin', pass: 'admin123' },
  { email: 'luciana.ruiz.cahuas@vallegrande.edu.pe', pass: 'luciana12345' },
  { email: 'ciro.poma@vallegrande.edu.pe', pass: 'ciro12345' },
];

export function getCurrentUser(): SessionUser | null {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function login(username: string, password: string): boolean {
  const admin = adminAccounts.find((acc) => acc.email === username && acc.pass === password);
  if (admin) return saveSession({ username, role: 'admin' });
  if (username === 'user' && password === 'user123') return saveSession({ username, role: 'user' });

  const users: RegisterPayload[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const found = users.find((u) => u.email === username && u.password === password);
  if (found) return saveSession({ username, role: 'user' });
  return false;
}

function saveSession(user: SessionUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('session-change'));
  return true;
}

export function registerUser(data: RegisterPayload): boolean {
  const users: RegisterPayload[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.some((u) => u.email === data.email)) return false;
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, data]));
  return true;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('session-change'));
}

export const isLoggedIn = () => getCurrentUser() !== null;
export const isAdmin = () => getCurrentUser()?.role === 'admin';
