'use server';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'

export async function createUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId');
    if (userId) {
        const user = await fetchQuery(api.users.getById, { id: userId.value });
        if (user) return userId.value;
        await fetchMutation(api.users.create, {
            id: userId.value,
            is_guest: true,
            ai_requests: 0
        })
        return userId.value;
    }
    
    const newUserId = uuidv4();
    try {
        const createUser = await fetchMutation(api.users.create, {
            id: newUserId,
            is_guest: true,
            ai_requests: 0
        });
    } catch (error) {
        console.error('Failed to create user:', error);
    }
    return newUserId;
}
