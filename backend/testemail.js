import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('API KEY loaded:', process.env.RESEND_API_KEY ? '✅ Yes' : '❌ MISSING');

const { data, error } = await resend.emails.send({
  from: 'Store <onboarding@resend.dev>',
  to: ['thangamwrites@gmail.com'],
  subject: 'Test Email from TMT Store',
  html: '<h2>It works! 🎉</h2><p>Your Resend setup is working correctly.</p>',
});

if (error) {
  console.error('❌ Resend Error:', error);
} else {
  console.log('✅ Email sent! ID:', data.id);
}