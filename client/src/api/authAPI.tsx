import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const { token } = await response.json();
    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to login: ' + error.message);
    } else {
      throw new Error('Failed to login: An unknown error occurred');
    }
  }
};

export { login };
