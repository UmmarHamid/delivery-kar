import { Client, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

export const account = new Account(client);

// Get current user
export const getUser = async () => {
  try {
    const user = await account.get();
    console.log('Fetched User:', user);
    return user;
  } catch (error) {
    console.error('GetUser Error:', error);
    return null;
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

// Sign up function
export const signUp = async (email: string, password: string, name: string) => {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.error('SignUp Error:', error);
    throw error;
  }
};
