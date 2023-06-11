import login from '/src/utils/api/login';
import { isEmpty } from 'validator';

import { setCookie, getCookies } from 'cookies-next';
import handleChangeUrl from '/src/utils/functions/handleChangeUrl';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default function handleLogin(event, body, setError, router) {
  event.preventDefault();

  if (!isEmpty(body.username) && !isEmpty(body.password)) {
    setError('');

    login(body)
      .then((verify) => {
        if (verify) {
          let token = createToken({ username: body.username }, JWT_SECRET);
          setCookie('authorization', token);

          console.log(getTokenVerify(token));

          const cookies = getCookies();
          const auth = cookies.authorization;
          const decodedToken = verifyToken(token);

          if (decodedToken) {
            handleChangeUrl(null, '/', router);
          } else {
            handleChangeUrl(null, '/login', router);
          }
        } else {
          setError('error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    setError('error');
  }
}

const createToken = (data, secret) => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify(data)).toString('base64');

  const signature = createSignature(`${header}.${payload}`, secret);

  return `${header}.${payload}.${signature}`;
};

const createSignature = (message, secret) => {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
};

const verifyToken = (token) => {
  const [header, payload, signature] = token.split('.');

  const isSignatureValid = verifySignature(`${header}.${payload}`, JWT_SECRET, signature);

  if (!isSignatureValid) {
    throw new Error('Invalid token signature');
  }

  const decodedPayload = JSON.parse(base64UrlDecode(payload));
  return decodedPayload;
};

const verifySignature = (message, secret, signature) => {
  const crypto = require('crypto');
  const calculatedSignature = crypto.createHmac('sha256', secret).update(message).digest('base64');
  return calculatedSignature === signature;
};

const base64UrlDecode = (input) => {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
};

export function getTokenVerify(token) {
  return verifyToken(token);
}