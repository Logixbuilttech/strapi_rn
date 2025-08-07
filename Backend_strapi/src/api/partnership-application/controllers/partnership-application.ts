/**
 * partnership-application controller
 */

import { factories } from '@strapi/strapi'

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; // Set this in your .env

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
  // ...other fields if you want
};

export default factories.createCoreController('api::partnership-application.partnership-application', ({ strapi }) => ({
  async create(ctx) {
    const { turnstileToken, ...rest } = ctx.request.body.data || {};

    // 1. Check for token
    if (!turnstileToken) {
      return ctx.badRequest('CAPTCHA token missing');
    }

    // 2. Verify with Cloudflare
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY || '',
        response: turnstileToken,
        // remoteip: ctx.request.ip, // optional
      }),
    });
    const verifyData = await verifyRes.json() as TurnstileVerifyResponse;
    console.log("🚀 ~ create ~ verifyData:", verifyData)

    if (!verifyData.success) {
      return ctx.badRequest('CAPTCHA failed');
    }

    // 3. Remove token from data before saving
    ctx.request.body.data = rest;

    // 4. Proceed with default create
    return await super.create(ctx);
  }
}));