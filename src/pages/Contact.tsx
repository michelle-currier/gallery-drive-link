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
      // Simple mailto functionality for now
      const subject = `Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:michelle@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(mailtoUrl, '_blank');

      toast({
        title: "Email client opened!",
        description: "Your default email client should open with the message. Please send from there.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to open email client. Please email directly to michelle@example.com",
        variant: "destructive",
      });
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