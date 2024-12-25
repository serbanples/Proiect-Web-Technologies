import * as z from 'zod'; 

export const registerBodySchema = z.object({
	name: z.string(),
	password: z.string(),
	email: z.string(),
	confirmedPassword: z.string()
});

export const loginBodySchema = z.object({
	email: z.string(),
	password: z.string()
});
