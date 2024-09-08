const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const config = require("../config/config");

class Email {
  constructor() {
    this.from = config.EMAIL_FROM;
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: config.MAILTRAP_HOST,
      auth: {
        user: config.MAILTRAP_USER,
        pass: config.MAILTRAP_PASS,
      },
    });
  }

  async sendEmailVerification(options) {
    try {
      const email = {
        from: this.from,
        subject: "Email verification",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/email-verification.pug"),
          {
            username: options.username,
            url: `http://localhost:3001/users/email-verification/${options.userId}/${options.token}`,
          }
        ),
      };
      const response = await this.transporter.sendMail(email);
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordLink(options) {
    try {
      const email = {
        from: this.from,
        subject: "Reset your password",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/password-reset.pug"),
          {
            url: `http://localhost:3001/users/reset-password/${options.userId}/${options.token}`,
          }
        ),
      };
      const response = await this.transporter.sendMail(email);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new Email();
