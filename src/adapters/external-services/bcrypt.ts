import bcrypt from 'bcrypt';

export async function securePassword(password: string | undefined) {
  if (password) {
    return await bcrypt.hash(password, 10);
  }
}

export async function matchPassword(passwordOne: string, passwordTwo: string) {
  return await bcrypt.compare(passwordOne, passwordTwo);
}

module.exports = { securePassword, matchPassword };
