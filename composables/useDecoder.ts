// temp, until backend refactor
export const useDecoder = function () {
  /**
   * Decode a Google ID token (JWT) manually without libraries
   * @param token - Google ID token (JWT string)
   */
  function decodeGoogleToken(token: string): any | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      // JWT payload is the 2nd part
      const payload = parts[1];

      // Base64URL decode
      const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

      // Parse JSON
      return JSON.parse(decoded);
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  }

  return { decodeGoogleToken };
};
