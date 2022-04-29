import * as nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false
		}
	})

	const message = await transporter.sendMail({
		from: "noreply.labianfarms@gmail.com",
		to,
		subject: "Reset password",
		html: `
		<html>
		<body>
		<h2>Xin chào,</h2>
		<div>${html}</div>
		<p>Trân trọng,</p>
		<b style="display:block;color:#059669;">Labian Farms</b>
		<i>Đây là thư gửi tự động, vui lòng không phản hồi ở đây.</i>
		</body>
		</html>`
	})

	console.log("Message sent: %s", message.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}