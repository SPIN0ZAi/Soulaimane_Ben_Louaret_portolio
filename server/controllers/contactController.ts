import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Contact } from '../models/Contact';

export class ContactController {
  // POST /api/contact - Submit contact form
  static async submitContactForm(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, subject, message } = req.body;
      
      // Get client info for spam prevention
      const ipAddress = req.ip || req.connection?.remoteAddress;
      const userAgent = req.get('User-Agent');

      // Create contact entry
      const contact = new Contact({
        name,
        email,
        subject,
        message,
        ipAddress,
        userAgent
      });

      await contact.save();

      // Send notification email to Soulaimane
      try {
        await ContactController.sendNotificationEmail({
          name,
          email,
          subject,
          message,
          contactId: contact._id
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        data: {
          id: contact._id,
          timestamp: contact.createdAt
        }
      });
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Please check your input',
          errors: Object.values(error.errors).map((err: any) => ({
            field: err.path,
            message: err.message
          }))
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/contact - Get all contact messages (admin only)
  static async getContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { 
        page = 1, 
        limit = 20,
        isRead,
        priority 
      } = req.query;

      // Build filter
      const filter: any = {};
      if (isRead !== undefined) {
        filter.isRead = isRead === 'true';
      }
      if (priority) {
        filter.priority = priority;
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Get messages
      const [messages, total] = await Promise.all([
        Contact.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .select('-__v'),
        Contact.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(total / limitNum);

      res.status(200).json({
        success: true,
        data: {
          messages,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalMessages: total,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1
          }
        }
      });
    } catch (error) {
      console.error('Get contact messages error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch messages',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // PUT /api/contact/:id/read - Mark message as read (admin only)
  static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const contact = await Contact.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
      );

      if (!contact) {
        res.status(404).json({
          success: false,
          message: 'Message not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Message marked as read',
        data: contact
      });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update message',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // DELETE /api/contact/:id - Delete contact message (admin only)
  static async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        res.status(404).json({
          success: false,
          message: 'Message not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      console.error('Delete message error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete message',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // Private method to send notification email
  private static async sendNotificationEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    contactId: string;
  }): Promise<void> {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #2563eb; }
          .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
            <p>From your portfolio website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              <p>Contact ID: ${data.contactId}</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${data.subject}`,
      html: htmlContent,
      replyTo: data.email
    };

    await transporter.sendMail(mailOptions);
  }
}