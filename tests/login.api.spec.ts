import { test, expect, request } from '@playwright/test';

test('login valido devuelve token', async ({ request }) => { 
    const res = await request.post('/api/login', {
        data: { email: 'dra.rivas@medconnect.test', password: 'Salud2024!'},
    });
    
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeTruthy();
    
    })

test('login invalido devuelve 401', async ({ request }) => { 
    const res = await request.post('/api/login', {
        data: { email: 'dra.rivas@medconnect.test', password: 'claveMala'},
    });
    
    expect(res.status()).toBe(401);
        
    })