// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();

exports.verifyId = (id) => {
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		return true;
	}
	return false;
};

exports.findProductInProductsArray = (products, pId) => {
	products.find((id) => {
		return id.toString() === pId;
	});

	return -1;
};

exports.getIndexOfProduct = (products, pId) => {
	let index = products.indexOf(pId);
	return index;
};

// const sendEmail = async (options) => {
// 	const transporter = nodemailer.createTransport({
// 		host: process.env.SMTP_HOST,
// 		port: process.env.SMTP_PORT,
// 		auth: {
// 			type: "login",
// 			user: process.env.SMTP_MAIL,
// 			pass: process.env.SMTP_PASSWORD,
// 		},
// 	});

// 	transporter.verify((error, success) => {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log("Successfull connection");
// 		}
// 	});

// 	const mailOptions = {
// 		from: options.sellerEmail,
// 		to: options.userEmail,
// 		subject: options.subject,
// 		text: options.message,
// 	};

// 	await transporter.sendMail(mailOptions);
// };

// export { verifyId, findProductInProductsArray, getIndexOfProduct };
