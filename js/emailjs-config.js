/**
 * Global Fusion contact email setup.
 * Only PUBLIC account identifiers belong here; never add passwords or private keys.
 * 1. Connect your mailbox in EmailJS and copy its Service ID.
 * 2. Create the notification template using html/email-templates/contact-notification.html.
 *    To Email: your own fixed inbox; Reply-To: {{from_email}}.
 * 3. Create the acknowledgement using html/email-templates/contact-auto-reply.html.
 *    To Email: {{from_email}}; Reply-To: your own fixed inbox.
 * 4. In the notification template's Auto-Reply tab, link the acknowledgement template.
 *    This linked template uses another request from your EmailJS quota.
 * 5. Fill in the three public identifiers below.
 */
window.GFEmailConfig = Object.freeze({
  publicKey: 'U-dxU5ZbSZqd2rulI',
  serviceId: 'service_hcao4lo',
  notificationTemplateId: 'template_qrxhp06'
});
