import { useRouter } from 'next/navigation';

export async function loginSuperAdmin(email: string, password: string) {
  const response = await fetch('/api/sa/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  const { token } = data
  localStorage.setItem('token', token)
  
  // Set the token as an HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=86400; httpOnly; secure; samesite=strict`

  return token
}

export async function loginLocationAdmin(email: string, password: string, locationId: string) {
  const response = await fetch('/api/la/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, locationId }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const { token } = await response.json();
  localStorage.setItem('token', token);
  
  // Set the token as an HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=86400; httpOnly; secure; samesite=strict`;

  return token;
}

export async function loginEventHost(email: string, password: string, eventId: string, locationId: string) {
  console.log('response')
  const response = await fetch('/api/hs/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, eventId, locationId }),
  });


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Login failed');
  }

  const { token } = await response.json();
  localStorage.setItem('token', token);
  
  // Set the token as an HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=86400; httpOnly; secure; samesite=strict`;

  return token;
}

export async function loginEventStaff(email: string, password: string, eventId: string) {
  const response = await fetch('/api/st/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, eventId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Login failed');
  }

  const { token } = await response.json();
  localStorage.setItem('token', token);
  
  // Set the token as an HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=86400; httpOnly; secure; samesite=strict`;

  return token;
}

export function useAuth() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  return { 
    logout,
    loginSuperAdmin,
    loginLocationAdmin,
    loginEventHost,
    loginEventStaff
  };
}

