import { z } from 'zod';

export const ownerSchema = z.object({
    name: z.string().min(2, 'Name should have at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

export const bookSchema = z.object({
    title: z.string().min(2, 'Title should have at least 2 characters'),
    author: z.string().min(2, 'Author should have at least 2 characters'),
    category: z.string(),
    price: z.number().positive('Price should be a positive number'),
});
