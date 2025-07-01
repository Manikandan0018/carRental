import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // make sure this is at the top of your file

export const sendOTP = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Manikandan Car-Rental" ${process.env.EMAIL_USER}`,
      to,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <b>${otp}</b>. It will expire in 5 minutes.</p></b> don't share this OTP to anyone`,
    });

    console.log('✅ OTP email sent to', to);
  } catch (err) {
    console.error('❌ Error sending email:', err);
    throw err;
  }
};
