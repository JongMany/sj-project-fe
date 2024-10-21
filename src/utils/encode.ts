import CryptoJS from 'crypto-js';

export function encodeByAES256(data: string) {
  const key = process.env.NEXT_PUBLIC_THREAD_KEY;

  if (!key || key.length !== 32) {
    throw new Error('Key must be 32 characters long');
  }

  const iv = CryptoJS.lib.WordArray.random(16); // 16바이트 IV 생성
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // IV와 암호문을 함께 Base64 인코딩 (복호화를 위해 IV도 저장 필요)
  const encryptedBase64 = iv
      .concat(cipher.ciphertext)
      .toString(CryptoJS.enc.Base64);

  // URL-safe하게 변환
  const urlSafeBase64 = encryptedBase64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, ''); // URL-safe 변환

  return urlSafeBase64;
}

export function decodeByAES256(data: string) {
  const key = process.env.NEXT_PUBLIC_THREAD_KEY;
  if (!key || key.length !== 32) {
    throw new Error('Key must be 32 characters long');
  }

  // URL-safe 문자열을 다시 Base64로 변환
  let base64String = data.replace(/-/g, '+').replace(/_/g, '/');

  // Base64 문자열의 길이가 4의 배수가 아니면, = 패딩을 추가합니다.
  while (base64String.length % 4 !== 0) {
    base64String += '=';
  }

  // Base64 디코딩 후 첫 16바이트는 IV, 나머지는 암호문
  const encryptedData = CryptoJS.enc.Base64.parse(base64String);
  const iv = CryptoJS.lib.WordArray.create(encryptedData.words.slice(0, 4)); // 첫 16바이트가 IV
  const ciphertext = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(4),
  ); // 나머지는 암호문

  // CipherParams 객체 생성
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext,
  });

  // TODO: 나중에 체크해볼 것!
  const decrypted = CryptoJS.AES.decrypt(
      // { ciphertext: ciphertext },
      cipherParams,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      },
  );

  try {
    // 복호화 결과를 UTF-8로 변환
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    throw new Error('Decryption failed');
  }
}
