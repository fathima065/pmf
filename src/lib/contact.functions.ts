import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { z } from 'zod';
import { CONTACT, formatEnquiry } from './contact';

const schema = z.object({
  name: z.string().trim().min(1, 'Full name is required.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  company: z.string().trim().max(160).default(''),
  projectType: z.string().trim().min(1, 'Project type is required.').max(80),
  projectStage: z.string().trim().min(1, 'Project stage is required.').max(80),
  message: z.string().trim().min(1, 'Message is required.').max(4000),
  website: z.string().max(0).default(''),
});

async function sendNotification(data: z.infer<typeof schema>) {
  const key = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || CONTACT.email;
  const from = process.env.RESEND_FROM || 'Fathima NP <onboarding@resend.dev>';

  if (!key) {
    throw new Error('Email service is not configured.');
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: data.email,
    subject: `New Project Enquiry — ${data.name}`,
    text: `New enquiry received from Fathima's website.\n\n${formatEnquiry(data)}`,
  });

  if (error) {
    console.error('Resend delivery error:', error);
    throw new Error('Email delivery failed.');
  }
}

export const submitEnquiry = createServerFn({ method: 'POST' })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    await sendNotification(data);
    return { ok: true as const };
  });
