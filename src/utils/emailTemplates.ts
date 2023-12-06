import { ContactFormRequest, SendEmailEndpointPayload } from '../typesDefs/routes/contactForm/types';

export const customerContactFormTemplateToMe = (template: ContactFormRequest) => `
<!DOCTYPE html>
    <html lang='en' style='font-family: Verdana, Geneva, Tahoma, sans-serif;'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <meta name='description' content='Email de la pagina de contacto'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <title>Mensaje enviado desde DotDev Mailer de ${template.fullName}</title>
        </head>
        <body>
            <table style='width: 600px; padding: 20px; margin: 0 auto;'>
                <tr style='text-align: center;margin-bottom:5px;'>
                    <td>
                        <img width="560" height="auto" src='https://fchfbgr.stripocdn.email/content/guids/CABINET_304b9b102bad0a975aa95d648b0100ab124fca9cc0d7fd89fad55e1bacf4a8a6/images/banner_linkedin_dotdev.png' width='100px' alt='Logo Chapnik and Giesen'>
                    </td>
                </tr>
                <tr>
                    <td style='width: 100%;'>
                        <p><strong>Hola!,</strong></p>
                        <p><strong>Andromaguer</strong></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Te tengo buenas noticias, alguien ha escrito a tu pagina:</p>
                    </td>
                </tr>
                <tr style='display: block;'>
                    <td style='display: block; width: 100%;'>
                            <p><strong>Name:</strong> ${template.fullName}</p>
                            <p><strong>Email:</strong> ${template.email}<br></p>
                            <p><b>Phone:</b> ${template.phone}<b></b></p>
                            <p><strong>Message Subject:</strong> ${template.messageSubject.join(', ')}<br></p>
                            <p><strong>Message:</strong> "${template.message}"</p>
                    </td>
                </tr>
                <tr>
                  <td class="es-p10t es-p10b" align="center" style="font-size: 0px;">
                    <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
                      <tr>
                        <td class="es-p10r" valign="top" align="center"><img title="Instagram"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                            alt="Inst" width="32" height="32"></img></td>
                        <td valign="top" align="center" class="es-p10r"><img title="TikTok"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/tiktok-logo-black.png"
                            alt="Tt" width="32" height="32"></img></td>
                        <td valign="top" align="center" class="es-p10r"><img title="Whatsapp"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/messenger-icons/logo-black/whatsapp-logo-black.png"
                            alt="Whatsapp" width="32" height="32"></img></td>
                        <td valign="top" align="center"><img title="Linkedin"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png"
                            alt="In" width="32" height="32"></img></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="es-m-txt-c" align="center">
                    <p style="color: #f1c232"><b>DotDev | By Andres Carrasquero</b></p>
                  </td>
                </tr>
                <tr>
                  <td class="es-p5t es-p5b" align="center">
                    <p style="color: #999999">Thanks for visiting my web portolio!</p>
                    <p style="color: #999999"><br></p>
                  </td>
                </tr>
            </table>
        </body>
    </html>
`;

export const customerContactFormTemplateToCustomer = (template: Partial<SendEmailEndpointPayload>) => `
<!DOCTYPE html>
    <html lang='en' style='font-family: Verdana, Geneva, Tahoma, sans-serif;'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <meta name='description' content='Email de la pagina de contacto'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <title>Mensaje enviado desde DotDev Mailer de ${template.fullName}</title>
        </head>
        <body>
            <table style='width: 600px; padding: 20px; margin: 0 auto;'>
                <tr style='text-align: center;margin-bottom:5px;'>
                    <td>
                        <img width="560" height="auto" src='https://fchfbgr.stripocdn.email/content/guids/CABINET_304b9b102bad0a975aa95d648b0100ab124fca9cc0d7fd89fad55e1bacf4a8a6/images/banner_linkedin_dotdev.png' width='100px' alt='Logo Chapnik and Giesen'>
                    </td>
                </tr>
                <tr>
                    <td style='width: 100%;'>
                        <p><strong>Hola!,</strong></p>
                        <p><strong>${template.fullName}</strong></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><b>Te confirmo que me ha llegado tu correo,</b> muchisimas gracias por contactarme!</p>
                    </td>
                </tr>
                <tr>
                  <td>
                      <p>En las proximas horas o dias laborables, te estare dando una respuesta, muchas gracias por tu paciencia! 👍</p>
                  </td>
                </tr>
                <tr>
                  <td>
                      <p>Este es el comienzo de una gran conexion que tendremos! 😁</p>
                  </td>
                </tr>
                <tr>
                  <td>
                      <p>Este correo hace referencia a este mensaje: </p>
                      <i>"${template.message}"</i>
                      <br />
                      <i style="font-size: 12px; color: #7a7a7a; margin-top: 20px;">Recibido el -> ${template.date}</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="width: 100%; text-align: center; margin-top: 30px;"><b>¡Únete a la conversación! Explora mi perfil en las redes sociales ¡Te espero allí!</b></p>
                  </td>
                </tr>
                <tr>
                  <td class="es-p10t es-p10b" align="center" style="font-size: 0px;">
                    <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.instagram} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Instagram"
                              src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                              alt="Inst"  width="32" height="32">
                            </img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.tiktok} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="TikTok"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/tiktok-logo-black.png"
                            alt="Tt" width="32" height="32"></img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.whatsapp} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Whatsapp"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/messenger-icons/logo-black/whatsapp-logo-black.png"
                            alt="Whatsapp" width="32" height="32"></img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.linkedin} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Linkedin"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png"
                            alt="In" width="32" height="32"></img>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="es-m-txt-c" align="center">
                    <p style="color: #f1c232"><b>DotDev | By Andres Carrasquero</b></p>
                  </td>
                </tr>
                <tr>
                  <td class="es-p5t es-p5b" align="center">
                    <p style="color: #999999">Gracias por visitar mi portafolio web!</p>
                    <p style="color: #999999"><br></p>
                  </td>
                </tr>
            </table>
        </body>
    </html>
`;

export const customerContactFormTemplateToCustomerEnglish = (template: Partial<SendEmailEndpointPayload>) => `
<!DOCTYPE html>
    <html lang='en' style='font-family: Verdana, Geneva, Tahoma, sans-serif;'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <meta name='description' content='Email de la pagina de contacto'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <title>Mensaje enviado desde DotDev Mailer de ${template.fullName}</title>
        </head>
        <body>
            <table style='width: 600px; padding: 20px; margin: 0 auto;'>
                <tr style='text-align: center;margin-bottom:5px;'>
                    <td>
                        <img width="560" height="auto" src='https://fchfbgr.stripocdn.email/content/guids/CABINET_304b9b102bad0a975aa95d648b0100ab124fca9cc0d7fd89fad55e1bacf4a8a6/images/banner_linkedin_dotdev.png' width='100px' alt='Logo Chapnik and Giesen'>
                    </td>
                </tr>
                <tr>
      <td style='width: 100%;'>
        <p><strong>Hello!,</strong></p>
        <p><strong>${template.fullName}</strong></p>
      </td>
    </tr>
    <tr>
      <td>
        <p><b>I confirm that I have received your email,</b> thank you very much for contacting me!</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>In the next few hours or business days, I will be giving you a response, thank you very much for your
          patience! 👍</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>This is the beginning of a great connection we will have! 😁</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>This email refers to this message: </p>
        <i>"${template.message}"</i>
        <br />
        <i style="font-size: 12px; color: #7a7a7a; margin-top: 20px;">Received on -> ${template.date}</i>
      </td>
    </tr>
    <tr>
      <td>
        <p style="width: 100%; text-align: center; margin-top: 30px;"><b>Join the conversation! Explore my profile on
            social networks I wait for you there!</b></p>
      </td>
    </tr>
                <tr>
                  <td class="es-p10t es-p10b" align="center" style="font-size: 0px;">
                    <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.instagram} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Instagram"
                              src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                              alt="Inst"  width="32" height="32">
                            </img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.tiktok} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="TikTok"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/tiktok-logo-black.png"
                            alt="Tt" width="32" height="32"></img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.whatsapp} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Whatsapp"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/messenger-icons/logo-black/whatsapp-logo-black.png"
                            alt="Whatsapp" width="32" height="32"></img>
                          </a>
                        </td>
                        <td class="es-p10r" valign="top" align="center">
                          <a href=${template.linkedin} target='_blank' rel='noreferrer noopener nofollow'>
                            <img title="Linkedin"
                            src="https://fchfbgr.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png"
                            alt="In" width="32" height="32"></img>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="es-m-txt-c" align="center">
                    <p style="color: #f1c232"><b>DotDev | By Andres Carrasquero</b></p>
                  </td>
                </tr>
                <tr>
                  <td class="es-p5t es-p5b" align="center">
                    <p style="color: #999999">Thanks for visiting my web portolio!</p>
                    <p style="color: #999999"><br></p>
                  </td>
                </tr>
            </table>
        </body>
    </html>
`;
