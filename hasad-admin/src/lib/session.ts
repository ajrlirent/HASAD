import { SessionPayload } from '@/types/auth'
import { SignJWT, jwtVerify } from 'jose'

// const secretKey = process.env.SESSION_SECRET
const secretKey = "OXOPIMp9dda/pb0qhqx/5y4EX08l7fh8FuTc6YLufSk="
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}