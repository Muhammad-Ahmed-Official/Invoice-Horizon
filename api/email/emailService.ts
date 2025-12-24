import nodemailer from 'nodemailer';
import { RESEND_OTP_Template, VERIFY_EMAIL_Template } from './emailTemplate';
import { InternalServerErrorException } from '@nestjs/common';

const emailConfig = {
    service: "gmail",
    port: 465,                
    secure: true, 
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};

async function sendEmail(mail:string, otp:number) {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail, 
        subject: "Veirfy Email",
        html: VERIFY_EMAIL_Template(otp), 
    };


    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: `Email sent to ${mail} via email`,
        };
    } catch (error) {
        console.error(`Error sending email to ${mail}:`, error);
       throw new InternalServerErrorException(`Failed to send email to ${mail}`);
    }
}


async function resendOtpEmail(mail:string, otp:number) { 
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail, 
        subject: "Rsend OTP",
        html: RESEND_OTP_Template(otp), 
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: `Email sent to ${mail} via email`,
        };
    } catch (error) {
        throw `Error sending email to ${mail} via email: ${error}`;
    }
}


export { sendEmail, resendOtpEmail }