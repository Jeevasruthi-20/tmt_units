import { Resend } from 'resend';

console.log('API KEY:', process.env.RESEND_API_KEY); // ← moved here

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification({ customerName, product, amount }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: ['thangamwrites@gmail.com'],
      subject: `New Order from ${customerName}`,
      html: `
        <h2>New Order Received! 🛒</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error); // ← shows exact Resend error
    } else {
      console.log('Order email sent! ID:', data.id); // ← confirms success
    }

  } catch (error) {
    console.error('Email error:', error);
  }
}