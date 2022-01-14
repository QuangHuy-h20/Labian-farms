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
		<p>Ấn vào đường dẫn bên dưới để thay đổi mật khẩu của bạn</p>
		<div>${html}</div>
		<p>Vui lòng hoàn thành việc cập nhật mật khẩu, đường dẫn sẽ hết hạn sau 15 phút.</p>
		<p>Labian Farms</p>
		<b>Đây là thư gửi tự động, vui lòng không phản hồi ở đây.</b>
		</body>
		</html>`
	})

	console.log("Message sent: %s", message.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}