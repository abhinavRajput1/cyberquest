import axios from 'axios';

// Types
export interface User {
    id: string;
    name: string;
    email: string;
    xp: number;
    level: number;
    badges: string[];
    completedMissions?: number;
    streak?: number;
}

const MOCK_DELAY = 800;

// Mock Data Storage (in memory for session, or localStorage for persistence)
const getMockUser = (): User | null => {
    const stored = localStorage.getItem('mock_user');
    return stored ? JSON.parse(stored) : null;
};

const setMockUser = (user: User | null) => {
    if (user) {
        localStorage.setItem('mock_user', JSON.stringify(user));
        localStorage.setItem('is_authenticated', 'true');
    } else {
        localStorage.removeItem('mock_user');
        localStorage.removeItem('is_authenticated');
    }
};

// Helper to check if we are in production (Vercel) where backend might be missing
// We can also just rely on the API call failing, but checking hostname is faster for immediate fallback
const isVercel = window.location.hostname.includes('vercel.app');

export const authService = {
    checkAuth: async (): Promise<User | null> => {
        try {
            if (!isVercel) {
                const response = await axios.get('/api/auth/me');
                return response.data.user;
            }
            throw new Error('Vercel environment - skipping real backend');
        } catch (error) {
            // Fallback to mock session
            console.log('Backend not available, using mock session');
            return getMockUser();
        }
    },

    login: async (email: string, _password: string): Promise<User> => {
        try {
            if (!isVercel) {
                const response = await axios.post('/api/auth/login', { email, password: _password });
                return response.data.user;
            }
            throw new Error('Vercel environment - skipping real backend');
        } catch (error) {
            console.log('Backend not available, performing mock login');
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

            // Mock successful login
            const mockUser: User = {
                id: 'mock-user-id',
                name: email.split('@')[0],
                email: email,
                xp: 150,
                level: 2,
                badges: ['rookie', 'fast-learner'],
                completedMissions: 1,
                streak: 3
            };
            setMockUser(mockUser);
            return mockUser;
        }
    },

    signup: async (name: string, email: string, _password: string): Promise<User> => {
        try {
            if (!isVercel) {
                const response = await axios.post('/api/auth/signup', { name, email, password: _password });
                return response.data.user;
            }
            throw new Error('Vercel environment - skipping real backend');
        } catch (error) {
            console.log('Backend not available, performing mock signup');
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

            const mockUser: User = {
                id: 'mock-user-id-' + Date.now(),
                name: name,
                email: email,
                xp: 0,
                level: 1,
                badges: [],
                completedMissions: 0,
                streak: 0
            };
            setMockUser(mockUser);
            return mockUser;
        }
    },

    logout: async (): Promise<void> => {
        try {
            if (!isVercel) {
                await axios.post('/api/auth/logout');
            }
        } catch (error) {
            console.log('Backend logout failed, clearing mock session');
        } finally {
            setMockUser(null);
        }
    }
};
