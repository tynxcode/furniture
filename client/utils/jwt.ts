import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/jwt'

export const encodeServerToken = (accessToken: string): string => {
    return jwt.sign(accessToken, jwtSecret)
}

export const decodeServerToken = (accessToken: string): string => {
    return jwt.verify(accessToken, jwtSecret)
}