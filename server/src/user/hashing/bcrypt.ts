import * as bcrypt from 'bcrypt';

export const hashingPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt)
}

export const comparePassword = async (pass: string, hash: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(pass, hash);
    return isMatch
}
