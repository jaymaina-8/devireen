"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send } from "lucide-react";
import { z } from "zod";
import { toast } from "@/lib/store/toast-store";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattened = result.error.flatten().fieldErrors;
      Object.keys(flattened).forEach(key => {
        fieldErrors[key] = flattened[key as keyof typeof flattened]?.[0] || "";
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thank you! We will get back to you shortly.",
        variant: "success",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-text-main mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1">Name</label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your full name" 
            className={errors.name ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
          />
          {errors.name && <p className="text-sm text-error-600 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">Email</label>
          <Input 
            id="email"
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email address" 
            className={errors.email ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
          />
          {errors.email && <p className="text-sm text-error-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-text-main mb-1">Subject</label>
          <Input 
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="How can we help?" 
            className={errors.subject ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
          />
          {errors.subject && <p className="text-sm text-error-600 mt-1">{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-1">Message</label>
          <textarea 
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-text-main placeholder:text-text-muted disabled:opacity-50 ${
              errors.message 
                ? "border-error-500 focus:border-error-500 focus:ring-error-500 focus:ring-1" 
                : "border-border-main focus:border-primary-500 focus:ring-primary-500 focus:ring-1"
            }`}
            placeholder="Write your message here..."
          />
          {errors.message && <p className="text-sm text-error-600 mt-1">{errors.message}</p>}
        </div>
        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : (
            <><Send className="mr-2 h-4 w-4" /> Send Message</>
          )}
        </Button>
      </form>
    </div>
  );
}
