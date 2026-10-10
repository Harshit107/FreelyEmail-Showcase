// Client-side HTML Template Generators directly reproducing FreelyEmail-API templates

export const renderOtpTemplate = (appName, otp, withValidTime) => {
  const safeApp = appName || "FreelyEmail";
  const safeOtp = otp || "492810";
  const year = new Date().getFullYear();
  const validityNotice = withValidTime
    ? `Expires in <strong>${withValidTime} minutes</strong>`
    : `Expires shortly`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 28px 32px 12px 32px;" align="center">
              <div style="display: inline-block; padding: 6px 14px; background-color: #eef2ff; border-radius: 10px;">
                <span style="font-size: 15px; font-weight: 700; color: #4338ca; letter-spacing: -0.3px;">${safeApp}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 32px 16px 32px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.4px;">
                Verification Code
              </h1>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                Use the one-time code below to authenticate your request for <strong>${safeApp}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 32px 20px 32px;" align="center">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px 24px;">
                <tr>
                  <td align="center">
                    <span style="font-family: 'SF Mono', Consolas, monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e1b4b; text-indent: 8px; display: inline-block;">
                      ${safeOtp}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <div style="display: inline-block; padding: 3px 10px; background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 6px;">
                      <span style="font-size: 11px; font-weight: 600; color: #92400e;">
                        ⏱ ${validityNotice}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 12px 14px; font-size: 12px; line-height: 1.6; color: #64748b;">
                🔒 <strong>Security Tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: #f1f5f9;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 32px; background-color: #fafbfd; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">
                Powered by <strong>${safeApp}</strong> &bull; Protected by <span style="color: #4f46e5; font-weight: 600;">FreelyEmail</span>
              </p>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">
                &copy; ${year} ${safeApp}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const renderLinkTemplate = (appName, link, withValidTime, buttonText) => {
  const safeApp = appName || "FreelyEmail";
  const safeLink = link || "https://freelyemail.dev/verify";
  const safeBtnText = buttonText || "Verify My Email";
  const year = new Date().getFullYear();
  const validityNotice = withValidTime
    ? `This link expires in <strong>${withValidTime} minutes</strong>.`
    : `This link will expire soon for your security.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 28px 32px 12px 32px;" align="center">
              <div style="display: inline-block; padding: 6px 14px; background-color: #eff6ff; border-radius: 10px;">
                <span style="font-size: 15px; font-weight: 700; color: #1d4ed8; letter-spacing: -0.3px;">${safeApp}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 32px 16px 32px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.4px;">
                Confirm Your Email Address
              </h1>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                Tap the button below to confirm your account and complete your sign-in for <strong>${safeApp}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 32px 24px 32px;" align="center">
              <a href="${safeLink}" target="_blank" style="display: inline-block; padding: 12px 32px; font-size: 14px; font-weight: 600; color: #ffffff; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); text-decoration: none; border-radius: 8px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
                ${safeBtnText} &rarr;
              </a>
              <div style="margin-top: 12px; font-size: 11px; color: #94a3b8; font-weight: 500;">
                ⏱ ${validityNotice}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; font-weight: 600;">
                  Button not working? Paste this link in your browser:
                </p>
                <p style="margin: 0; font-size: 11px; word-break: break-all; color: #2563eb;">
                  ${safeLink}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: #f1f5f9;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 32px; background-color: #fafbfd; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">
                Secured by <strong>${safeApp}</strong> &bull; Delivered via <span style="color: #2563eb; font-weight: 600;">FreelyEmail</span>
              </p>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">
                &copy; ${year} ${safeApp}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const renderNotificationTemplate = (appName, subject, message, ctaText, ctaUrl) => {
  const safeApp = appName || "FreelyEmail";
  const safeSubject = subject || "Notification Alert";
  const safeMsg = message || "This is a transactional update from FreelyEmail.";
  const year = new Date().getFullYear();

  const ctaBlock = ctaText && ctaUrl ? `
    <div style="margin: 20px 0;">
      <a href="${ctaUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 6px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">
        ${ctaText} &rarr;
      </a>
    </div>
  ` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #4f46e5 0%, #818cf8 50%, #c084fc 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 16px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left">
                    <div style="display: inline-block; padding: 5px 12px; background-color: #eef2ff; border-radius: 6px;">
                      <span style="font-size: 14px; font-weight: 700; color: #4338ca;">${safeApp}</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">Transactional Notification</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 19px; font-weight: 700; color: #0f172a;">
                ${safeSubject}
              </h1>
              <div style="font-size: 14px; line-height: 1.6; color: #475569;">
                ${safeMsg.replace(/\n/g, '<br/>')}
              </div>
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: #f1f5f9;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 32px; background-color: #fafbfd; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">
                Sent securely by <strong>${safeApp}</strong> via <span style="color: #4f46e5; font-weight: 600;">FreelyEmail</span>
              </p>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">
                &copy; ${year} ${safeApp}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
