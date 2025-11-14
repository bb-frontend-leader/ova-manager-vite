interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Function to set a cookie in the browser.
 * 
 * @param name - Name of the cookie
 * @param value - Value of the cookie
 * @param options - Optional settings for the cookie
 */
export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.maxAge !== undefined) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

/**
 * Function to get a cookie value by name.
 * 
 * @param name - Name of the cookie
 * @returns The value of the cookie or null if not found
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

/**
 * Function to delete a cookie by name.
 *  
 * @param name - Name of the cookie
 * @param path - Path of the cookie (default is '/')
 */
export const deleteCookie = (name: string, path: string = '/') => {
  setCookie(name, '', { path, maxAge: -1 });
};