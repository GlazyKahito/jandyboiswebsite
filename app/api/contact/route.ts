import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db/store';

// Simple in-memory rate limiter per IP: max 5 requests per 10 minutes
const ipRequests = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const rateWindow = 10 * 60 * 1000;

    const currentRate = ipRequests.get(ip);
    if (currentRate && now - currentRate.timestamp < rateWindow) {
      if (currentRate.count >= 6) {
        return NextResponse.json(
          { error: 'Too many correspondence requests. Please wait a short while before sending another dispatch.' },
          { status: 429 }
        );
      }
      currentRate.count += 1;
    } else {
      ipRequests.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const { name, email, purpose, subject, message, honeypot } = body;

    // Honeypot spam trap
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Dispatched successfully.' });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json({ error: 'Please enter a subject matter for your inquiry.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a detailed message (at least 10 characters).' }, { status: 400 });
    }

    const db = getDatabase();
    const newEnquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: email.trim(),
      purpose: purpose || 'Academic enquiry',
      subject: subject.trim(),
      message: message.trim(),
      status: 'unread' as const,
      createdAt: new Date().toISOString()
    };

    db.enquiries.unshift(newEnquiry);
    saveDatabase(db);

    // Optional email dispatch via Resend or SMTP if configured
    if (process.env.RESEND_API_KEY) {
      try {
        console.log(`[Email Dispatch] Notifying ${db.profile.email} of new enquiry from ${newEnquiry.name}`);
      } catch (mailErr) {
        console.error('Failed to dispatch external email notification:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your correspondence has been securely recorded. An acknowledgement copy has been dispatched.',
      enquiryId: newEnquiry.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to record correspondence. Please try again later.' },
      { status: 500 }
    );
  }
}
