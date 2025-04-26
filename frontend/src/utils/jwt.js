import {jwtDecode} from 'jwt-decode';

function parseJwt(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export default parseJwt