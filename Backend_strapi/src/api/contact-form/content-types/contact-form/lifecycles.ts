module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (!result.publishedAt) {
      return;
    }
    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <h2 style="color: #333333;">📩 New Contact Form Submission</h2>
              <p style="font-size: 16px; color: #555555;">You have received a new message from the website contact form.</p>
              
              <table style="width: 100%; margin-top: 20px;">
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Name:</td>
                  <td style="padding: 8px 0;">${result.Name}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Email:</td>
                  <td style="padding: 8px 0;">${result.Email}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
                  <td style="padding: 8px 0;">${result.Phone}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Message:</td>
                  <td style="padding: 8px 0;">${result.HowWeCanHelp}</td>
                </tr>
              </table>

              <p style="margin-top: 30px; font-size: 14px; color: #999999;">Sent from your website's contact form.</p>
            </div>
          </div>
        `,
      });
       strapi.log.info('Email successfully sent for contact submission', {
        entryId: result.id,
        to: process.env.ADMIN_EMAIL,
      });
    } catch (err) {
      console.error('Error sending email:', err);
    }
  },
};
