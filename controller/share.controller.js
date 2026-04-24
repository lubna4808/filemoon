const ShareModel = require("../model/share.model")
const nodemailer = require("nodemailer")
const conn = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
      
    }
})
const getEmailTemplete = (link,senderName)=>{
    return ` 

    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Filemoon - File Shared</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:25px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          
          <!-- Branding Header -->
          <tr>
            <td style="text-align:center; padding-bottom:15px;">
              <h1 style="margin:0; color:#4CAF50; font-size:28px;">FileMoon</h1>
              <p style="margin:5px 0 0; color:#888; font-size:13px;">
                India's Best File Sharing Platform
              </p>
            </td>
          </tr>

          <tr>
            <td><hr style="border:none; border-top:1px solid #eee;"></td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="text-align:center; padding:20px 0;">
              <h2 style="margin:0; color:#333;">📁 File Shared With You</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="color:#555; font-size:15px; line-height:1.6;">
              <p>Hello,</p>
              <p>
                <strong>${senderName}</strong> has shared a file with you using <strong>Filemoon</strong>.
              </p>
              <p>
                Click the button below to securely download your file.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:25px 0;">
              <a href="${link}" 
                 style="background-color:#4CAF50; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-size:16px; font-weight:bold; display:inline-block;">
                 ⬇ Download File
              </a>
            </td>
          </tr>

          <!-- Expiry Info -->
          
          <!-- Security Note -->
          <tr>
            <td style="color:#777; font-size:13px; padding-top:15px; text-align:center;">
              For your security, this file will not be available after the expiration time.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:30px; text-align:center; font-size:12px; color:#aaa;">
              © 2026 Filemoon. All rights reserved.<br>
              Secure • Fast • Reliable
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

    `
}

const shareFile = async(req,res)=>{
    try{
        const { email, fileid }= req.body
        const link =`http://localhost:8080/api/file/download/${fileid}`
        const options = {
from:process.env.SMTP_EMAIL,
to:email,
subject:' Filemoon-nwe-file received',
html:getEmailTemplete(link)
        }
 await conn.sendMail(options)
 res.status(200).json({message:'Email sent'})

    }catch(err){
res.status(500).json({message:err.message})
}
}
module.exports ={
    shareFile
}