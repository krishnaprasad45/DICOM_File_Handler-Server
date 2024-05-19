import bcrypt from 'bcrypt';

export async function securePassword(password: string | undefined) {
  try {
    if (password) {
      return await bcrypt.hash(password, 10);
    }
  } catch (error) {
    console.error("Error securing password:", error);
    throw error;
  }
}

export async function matchPassword(passwordOne: string, passwordTwo: string) {
  try {
    return await bcrypt.compare(passwordOne, passwordTwo);
  } catch (error) {
    console.error("Error matching passwords:", error);
    throw error;
  }
}

module.exports = { securePassword, matchPassword };
