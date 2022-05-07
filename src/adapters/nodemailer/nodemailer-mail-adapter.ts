import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "175395f7ddef1a",
		pass: "21d0c6ef2efd44",
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({subject, body}: SendMailData) {
		await transport.sendMail({
			from: "Feedget <rudhy_nlw_return@feedget.com",
			to: "Rudhy Pereira <rudhydev@gmail.com>",
			subject,
			html: body
		});
	}
}
