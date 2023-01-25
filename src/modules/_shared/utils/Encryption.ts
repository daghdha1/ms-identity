import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const encryptStrWithBcrypt = async (str: string) => bcrypt.hash(str, 10);

export const compareTwoStrWithBcrypt = async (
  strTarget: string,
  strSaved: string
) => bcrypt.compare(strTarget, strSaved);

export const encryptStrWithCrypto = (
  strTarget: string,
  pwEncrypted: string
) => {
  const initVector = Buffer.from(process.env.CRYPTO_INIT_HEX_VECTOR, 'hex');
  const securityKey = Buffer.from(pwEncrypted, 'hex');
  console.log(securityKey)
  const cipher = crypto.createCipheriv(
    process.env.CRYPTO_ALGORITHM,
    securityKey,
    initVector
  );
  let strEncrypted = cipher.update(strTarget, 'utf-8', 'hex');
  strEncrypted += cipher.final('hex');
  return strEncrypted;
};

export const decryptStrWithCrypto = (
  strEncrypted: string,
  pwEncrypted: string
) => {
  const initVector = Buffer.from(process.env.CRYPTO_INIT_HEX_VECTOR, 'hex');
  const securityKey = Buffer.from(pwEncrypted, 'hex');
  const decipher = crypto.createDecipheriv(
    process.env.CRYPTO_ALGORITHM,
    securityKey,
    initVector
  );
  let strDecrypted = decipher.update(strEncrypted, 'hex', 'utf-8');
  strDecrypted += decipher.final('utf8');
  return strDecrypted;
};

export const generateRandomHex = (length: number) =>
  crypto.randomBytes(length).toString('hex');

export const stretchStr = (str: string, outputLength: number) => {
  const salt = crypto.randomBytes(16);
  return crypto.pbkdf2Sync(str, salt, 100000, outputLength, 'sha512');
};
