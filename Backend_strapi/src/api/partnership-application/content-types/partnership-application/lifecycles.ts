module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (!result.publishedAt) {
      return;
    }
    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Partnership Application',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #333333;">🤝 New Partnership Application</h2>
              <p style="font-size: 16px; color: #555555;">A new partnership application has been submitted through the website.</p>
              
              <table style="width: 100%; margin-top: 20px;">
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Full Name:</td>
                  <td style="padding: 8px 0;">${result.fullName}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Business Name:</td>
                  <td style="padding: 8px 0;">${result.businessName}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Email:</td>
                  <td style="padding: 8px 0;">${result.email}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
                  <td style="padding: 8px 0;">${result.phone}</td>
                </tr>
              </table>

              <p style="margin-top: 30px; font-size: 14px; color: #999999;">This message was generated automatically from your partnership application form.</p>
            </div>
          </div>
        `,
      });
      strapi.log.info('Email successfully sent for Partnership Application', {
        entryId: result.id,
        to: process.env.ADMIN_EMAIL,
      });
    } catch (err) {
      console.error('Error sending email:', err);
    }
  },
};
