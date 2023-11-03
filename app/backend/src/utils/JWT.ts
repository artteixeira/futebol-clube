import * as jwt from 'jsonwebtoken';

export default class JWT {
  private static secret = process.env.JWT_SECRET || 'secret';

  private static jwtConfig: jwt.SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static createToken(payload: jwt.JwtPayload): string {
    return jwt.sign(payload, this.secret, this.jwtConfig);
  }

  static validateToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  static decodeToken(token: string): jwt.JwtPayload | null {
    try {
      const decoded = jwt.decode(token);
      return decoded as jwt.JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
