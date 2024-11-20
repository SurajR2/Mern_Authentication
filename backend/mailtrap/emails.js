import { mailtrapTransport, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_USER_TEMPLATE,
} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [email];

  try {
    const response = await mailtrapTransport.sendMail({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationToken}",
        verificationToken
      ),
      category: "Email verification",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (user) => {
  const recipients = [user.email];
  try {
    const response = await mailtrapTransport.sendMail({
      from: sender,
      to: recipients,
      subject: `Welcome ${user.name}`,
      html: WELCOME_USER_TEMPLATE.replaceAll("{userName}", user.name),
      category: "Welcome Email",
    });
    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (user, resetPasswordToken) => {
  const recipients = [user.email];

  try {
    const response = await mailtrapTransport.sendMail({
      from: sender,
      to: recipients,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        `http://localhost:3000/api/auth/reset-password/${resetPasswordToken}`
      ),
      category: "Reset Password Email",
    });
    console.log("Reset password email sent successfully:", response);
  } catch (error) {
    console.error(`Error sending reset password email: ${error}`);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendPasswordResetSuccessEmail = async (user) => {
  const recipients = [user.email];

  try {
    const response = await mailtrapTransport.sendMail({
      from: sender,
      to: recipients,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent successfully:", response);
  } catch (error) {
    console.error(`Error sending password reset success email: ${error}`);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
