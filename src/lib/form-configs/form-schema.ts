import { z } from 'zod';

export const registerBaseSchema = z.object({
    Username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores')
        .transform(val => val.toLowerCase()),

    Email: z
        .string()
        .min(1, 'Email is required')
        .max(64, 'Email must be less than 64 characters')
        .email('Email must be a valid email address'),

    Phone: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Phone number must be valid')
        .optional(),

    Age: z
        .coerce.number()
        .int()
        .min(18, 'You must be at least 18 years old')
        .max(100),

    Password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(32)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    PasswordConfirm: z
        .string(),

    AcceptTerms: z
        .boolean()
        .refine(val => val === true, {
            message: 'You must accept the terms and conditions'
        }),
});

export const registerSchema = registerBaseSchema.superRefine(
    ({ Password, PasswordConfirm }, ctx) => {
        if (Password !== PasswordConfirm) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['PasswordConfirm'],
            });
        }
    }
);
