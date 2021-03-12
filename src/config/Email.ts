import * as nodemailer from "nodemailer";

/**
 * GMailService
 */
export class Email {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(
            `smtps://minibankcl%40gmail.com:a1s2d3f4*@smtp.gmail.com`
        );
    }

    /**
     *
     * @param to
     * @param subject
     * @param content
     */
    public sendMail(to: string, subject: string, content: string) {
        const options = {
            from: "from_test@gmail.com",
            to,
            subject,
            text: content
        };

        this.transporter.sendMail(options, (error, info) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            console.log(`Message Sent ${info.response}`);
        });
    }
}
export const email = new Email();
