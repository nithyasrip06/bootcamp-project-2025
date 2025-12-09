"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Invalid email format";
      }
    }

    // Validate message
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setSuccessMessage("");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Debug logging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('EmailJS Config Check:', {
          hasServiceId: !!serviceId,
          hasTemplateId: !!templateId,
          hasPublicKey: !!publicKey,
          serviceIdLength: serviceId?.length || 0,
          templateIdLength: templateId?.length || 0,
          publicKeyLength: publicKey?.length || 0,
        });
      }

      if (!serviceId || !templateId || !publicKey) {
        const missing = [];
        if (!serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
        if (!templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
        if (!publicKey) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
        
        setErrors({
          general: `Email service configuration error. Missing: ${missing.join(", ")}. Please check your .env.local file and restart the dev server.`,
        });
        return;
      }

      // Prepare email template parameters
      // Note: These variable names must match your EmailJS template variables
      const templateParams = {
        title: "New Contact Form Submission", // For {{title}} in subject
        from_name: name.trim(), // For {{from_name}}
        from_email: email.trim(), // For {{from_email}}
        message: message.trim(), // For {{message}}
        time: new Date().toLocaleString(), // For {{time}} - current date/time
        to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your-email@example.com",
      };

      // Send email using EmailJS (browser SDK)
      // Pass publicKey in options object
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey: publicKey,
        }
      );

      console.log("EmailJS response:", response);

      // Success - show message and reset form
      setSuccessMessage("Email sent successfully! I'll get back to you soon.");
      resetForm();
    } catch (err) {
      console.error("Error sending email:", err);
      
      // Handle EmailJS specific errors - they have a specific structure
      let errorMessage = "Failed to send email. Please try again.";
      
      if (err && typeof err === 'object') {
        // EmailJS errors have a text property
        if ('text' in err) {
          errorMessage = `EmailJS Error: ${err.text}`;
        } else if ('message' in err) {
          errorMessage = `Error: ${err.message}`;
        }
      } else if (err instanceof Error) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <input
        type="submit"
        value={isSubmitting ? "Sending..." : "Submit"}
        disabled={isSubmitting}
      />
    </form>
  );
}
