import * as z from 'zod'

const createEnv = () => {
    const EnvSchema = z.object({
        EXPO_PUBLIC_API_URL: z.string().url(),
        EXPO_PUBLIC_APP_URL: z.string().url().optional()

    })

   // Expo automatically exposes variables starting with EXPO_PUBLIC_
  const envVars = {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_APP_URL: process.env.EXPO_PUBLIC_APP_URL,
  };
    const parsedEnv = EnvSchema.safeParse(envVars)

    if(!parsedEnv.success) {
        throw new Error(`Invalid env provided.
            The Following variable are missing or invalid:
            ${Object.entries(parsedEnv.error.flatten().fieldErrors)

                .map(([k,v]) => `${k} : ${v}`)
                .join('\n')
            }
            
        `)
    }
    return parsedEnv.data
}

export const env = createEnv()