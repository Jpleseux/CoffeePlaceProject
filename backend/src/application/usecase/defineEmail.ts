const nodemailer = require("nodemailer")
export default class defineEmail{
    constructor(){
    }
    async getEmailAdmin(){
        const transporter =await nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'joaopleseux@gmail.com',
              pass: 'ntuk sgri jhyz cxwf',
            },
        });

        return await transporter
    }
}