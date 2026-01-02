import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { FORGOT_PASSWORD_Template, RESEND_OTP_Template, VERIFY_EMAIL_Template } from './emailTemplate';

export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    // Initialize the transporter with environment variables from config
    const emailConfig = {
      service: 'gmail',
      port: 587,
      secure: false, // false for TLS
      auth: {
        user: this.configService.get<string>('PORTAL_EMAIL'),
        pass: this.configService.get<string>('PORTAL_PASSWORD'),
      },
    };
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  // Send verification email
  async sendEmail(mail: string, otp: number) {
    const mailOptions = {
      from: this.configService.get<string>('PORTAL_EMAIL'),
      to: mail,
      subject: 'Verify Email',
      html: VERIFY_EMAIL_Template(otp),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        message: `Email sent to ${mail} via email`,
      };
    } catch (error) {
      console.error(`Error sending email to ${mail}:`, error);
      throw new InternalServerErrorException(`Failed to send email to ${mail}`);
    }
  }

  // Resend OTP email
  async resendOtpEmail(mail: string, otp: number) {
    const mailOptions = {
      from: this.configService.get<string>('PORTAL_EMAIL'),
      to: mail,
      subject: 'Resend OTP',
      html: RESEND_OTP_Template(otp),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        message: `Email sent to ${mail} via email`,
      };
    } catch (error) {
      console.error(`Error sending OTP email to ${mail}:`, error);
      throw new InternalServerErrorException(`Failed to send OTP email to ${mail}`);
    }
  };


    async forgotPasswordEmail(mail: string, resetLink: string) {
    const mailOptions = {
      from: this.configService.get<string>('PORTAL_EMAIL'),
      to: mail,
      subject: 'Update Password',
      html: FORGOT_PASSWORD_Template(resetLink),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        message: `Email sent to ${mail} via email`,
      };
    } catch (error) {
      console.error(`Error sending OTP email to ${mail}:`, error);
      throw new InternalServerErrorException(`Failed to send OTP email to ${mail}`);
    }
  };
}