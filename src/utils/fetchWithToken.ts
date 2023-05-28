import authConfig from '../auth_config.json';

const fetchWithToken = async (endpoint: string, token: string) => {
  const response = await fetch(`${authConfig.apiBase}${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    const { code, message } = await response.json();

    throw new Error(`${code}: ${message}`);
  }

  const { data } = await response.json();;

  return data;
}

export { fetchWithToken };