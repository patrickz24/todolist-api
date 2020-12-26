const { BadRequestError } = require("../helpers/errors");
const { transporter, info } = require("../utils/sendMail");

module.exports = {
  sendContact: async (req, res) => {
  const {
      first_name,
      last_name,
      email,
      subject,
      message,
    } = req.body;
  
    const text = `
            Nom : ${first_name} 
            Prénom : ${last_name}
            Email : ${email}
            Sujet : ${subject} \n
            Message : ${message}
      `;

    for (const key in req.body)
      if (req.body[key] == null) {
        throw new BadRequestError(
          "Bad request",
          `le champ ${key} doit être remplit `
        );
      }
    const sendMailContact = await transporter.sendMail({
      from: info.from,
      to: info.to,
      subject,
      text,
    });
    if (!sendMailContact) {
      res.status(500).json({ error: "problème de mail" });
      console.log("Problem occured, aarrh", error);
    }
    res.status(201).json({ sendMailContact });
    console.log("Email send with succes, yeah !");
  },
};
