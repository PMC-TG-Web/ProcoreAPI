import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  /**
   * Redirects the user to Procore for authentication.
   */
  public static login(req: Request, res: Response) {
    const authUrl = AuthService.getAuthUrl();
    res.redirect(authUrl);
  }

  /**
   * Handles the callback from Procore.
   */
  public static async callback(req: Request, res: Response) {
    const { code } = req.query;

    if (!code) {
      res.status(400).json({ error: 'Authorization code is missing' });
      return;
    }

    try {
      const token = await AuthService.exchangeCodeForToken(code as string);
      res.json({ 
        message: 'Authentication successful', 
        access_token: token 
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: 'Failed to exchange code for token', 
        details: error.message 
      });
    }
  }
}
