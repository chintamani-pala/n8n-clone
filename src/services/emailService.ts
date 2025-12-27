import ejs from "ejs"
import path from "path"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

export interface EmailData {
    to: string,
    name: string;
    url?: string;
    dashboardUrl?: string;
    [key: string]: any;
}

export class EmailService {
    private static async renderTemplate(templateName: string, data: EmailData): Promise<string> {
        const templatePath = path.join(process.cwd(), "src", "templates", "emails", `${templateName}.ejs`);
        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, data, (err: any, html: string) => {
                if (err) {
                    console.log("Error rendering template", err);
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
    }
    private static async sendMail(to: string, subject: string, html: string): Promise<boolean> {
        try {
            const mailOptions = {
                from: process.env.SMTP_USER,
                to,
                subject,
                html
            }
            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            console.log("Error sending email", error);
            return false
        }


    }

    public static async sendVerificationEmail(data: EmailData): Promise<boolean> {
        try {
            const html = await this.renderTemplate("email-verification", data);
            return await this.sendMail(data.to, "Verify your email address - FlowX", html);
        } catch (error) {
            console.log("Error sending verification email", error);
            return false
        }


    }
}