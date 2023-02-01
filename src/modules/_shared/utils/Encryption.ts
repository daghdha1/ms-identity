import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const hashStr = async (str: string) => bcrypt.hash(str, 10);

export const compareStrWithStrHashed = async (
  str: string,
  strHashed: string
) => {
  return bcrypt.compare(str, strHashed);
};

export const encryptStr = (strTarget: string, hash: string) => {
  const initVector = Buffer.from(process.env.CRYPTO_INIT_HEX_VECTOR, 'hex');
  const securityKey = Buffer.from(hash.substring(0, 32), 'utf8');
  const cipher = crypto.createCipheriv(
    process.env.CRYPTO_ALGORITHM,
    securityKey,
    initVector
  );
  let strEncrypted = cipher.update(strTarget, 'hex', 'base64');
  strEncrypted += cipher.final('base64');
  return strEncrypted;
};

export const decryptStr = (strTarget: string, hash: string) => {
  const initVector = Buffer.from(process.env.CRYPTO_INIT_HEX_VECTOR, 'hex');
  const securityKey = Buffer.from(hash.substring(0, 32), 'utf8');
  const decipher = crypto.createDecipheriv(
    process.env.CRYPTO_ALGORITHM,
    securityKey,
    initVector
  );
  let strDecrypted = decipher.update(strTarget, 'base64', 'hex');
  strDecrypted += decipher.final('hex');
  return strDecrypted;
};

export const generateRandomBytes = (lenght: number) => {
  return crypto.randomBytes(lenght);
};

export const generateRandomUtf8 = (length: number) => {
  return crypto.randomBytes(length).toString('utf-8');
};

export const generateRandomHex = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

// weak pass (utf-8) --> stretchString(Buffer) --> hex --> hash
export const stretchStr = (
  str: string,
  outputLength: number,
  customSalt?: Buffer,
  algorithm?: string
) => {
  return crypto.pbkdf2Sync(
    str,
    customSalt ?? crypto.randomBytes(16),
    100000,
    outputLength,
    algorithm ?? 'sha512'
  );
};

// call strtch
/* 
const salt: Buffer = generateRandomBytes(16);
const pwStretched: string = stretchStr(
    dto.password,
    32,
    salt,
    'sha512'
).toString('hex'); 
*/
