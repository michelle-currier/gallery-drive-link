import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Direct SendGrid API call
      const emailData = {
        personalizations: [
          {
            to: [{ email: "mushel@gmail.com" }],
            subject: `New Contact Form Message from ${formData.name}`
          }
        ],
        from: { email: "noreply@michellegallery.com" },
        content: [
          {
            type: "text/html",
            value: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Message:</strong></p>
              <p>${formData.message.replace(/\n/g, '<br>')}</p>
            `
          }
        ]
      };

      // Note: This will fail due to CORS, but shows the structure
      // In production, you'd need a backend/proxy to handle this
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mailto
      const subject = `Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:mushel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(mailtoUrl, '_blank');
      
      toast({
        title: "Email client opened",
        description: "SendGrid API blocked by browser. Your email client opened as fallback.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen custom-gradient-bg">
      <div className="container flex flex-col p-8 pb-20 gap-16 sm:p-20 mx-auto">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-4xl font-parkinsans">Contact</h1>
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-6">
              Michelle Currier - Graphic Designer & Visual Artist
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/80"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/80"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/80"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email:</h3>
                <a href="mailto:michelle@example.com" className="text-teal-600 hover:text-blue-500 transition-colors">
                  michelle@example.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Phone:</h3>
                <a href="tel:+1234567890" className="text-teal-600 hover:text-blue-500 transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Social Media:</h3>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">Instagram</a>
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">LinkedIn</a>
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">Behance</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}