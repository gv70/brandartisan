import nodemailer from 'nodemailer';
import type { InsertGiftRequest } from '@shared/schema';

// Configurazione email con Microsoft 365 Essential
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.OUTLOOK_EMAIL || 'info@mathilde.it',
      pass: process.env.OUTLOOK_PASSWORD || 'your-password'
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
};

export async function sendGiftRequestEmail(giftData: InsertGiftRequest) {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0b3d2e; font-family: 'Playfair Display', serif;">
          Nuova Richiesta Buono Regalo - Mathilde
        </h2>
        
        <div style="background: #f8f6f4; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0b3d2e; margin-top: 0;">Dati del Richiedente</h3>
          <p><strong>Nome:</strong> ${giftData.nome}</p>
          <p><strong>Email:</strong> ${giftData.email}</p>
          ${giftData.telefono ? `<p><strong>Telefono:</strong> ${giftData.telefono}</p>` : ''}
        </div>
        
        <div style="background: #efe3d4; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0b3d2e; margin-top: 0;">Dettagli del Regalo</h3>
          <p><strong>Destinatario:</strong> ${giftData.nomeDestinatario}</p>
          ${giftData.importo ? `<p><strong>Importo desiderato:</strong> ${giftData.importo}</p>` : ''}
          ${giftData.messaggio ? `
            <p><strong>Messaggio personalizzato:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; font-style: italic;">
              "${giftData.messaggio}"
            </div>
          ` : ''}
        </div>
        
        <div style="background: #0b3d2e; color: white; padding: 20px; border-radius: 10px; text-align: center;">
          <p style="margin: 0;">Richiesta ricevuta il ${new Date().toLocaleDateString('it-IT')}</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">
            Ricordati di contattare il cliente per finalizzare il buono regalo
          </p>
        </div>
      </div>
    `;
    
    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL || 'info@mathilde.it',
      to: process.env.OUTLOOK_EMAIL || 'info@mathilde.it', // Email di destinazione dell'atelier
      subject: `🎁 Nuova Richiesta Buono Regalo da ${giftData.nome}`,
      html: htmlContent,
      text: `
        Nuova Richiesta Buono Regalo - Mathilde
        
        Richiedente: ${giftData.nome}
        Email: ${giftData.email}
        ${giftData.telefono ? `Telefono: ${giftData.telefono}` : ''}
        
        Destinatario: ${giftData.nomeDestinatario}
        ${giftData.importo ? `Importo: ${giftData.importo}` : ''}
        ${giftData.messaggio ? `Messaggio: ${giftData.messaggio}` : ''}
        
        Ricevuta il ${new Date().toLocaleDateString('it-IT')}
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending gift request email:', error);
    
    // Fallback: apri il client email dell'utente
    const emailBody = `
Nuova Richiesta Buono Regalo - Mathilde

Richiedente: ${giftData.nome}
Email: ${giftData.email}
${giftData.telefono ? `Telefono: ${giftData.telefono}` : ''}

Destinatario: ${giftData.nomeDestinatario}
${giftData.importo ? `Importo desiderato: ${giftData.importo}` : ''}
${giftData.messaggio ? `Messaggio: ${giftData.messaggio}` : ''}
    `.trim();
    
    return { 
      success: false, 
      fallbackEmail: {
        to: 'info@mathilde.it',
        subject: `Richiesta Buono Regalo da ${giftData.nome}`,
        body: emailBody
      }
    };
  }
}