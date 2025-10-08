import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { NavbarSimple } from "@/components/Navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting to send contact form...", formData);

      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: formData,
        }
      );

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);

      // More detailed error handling
      let errorMessage =
        "Failed to send message. Please try again or email directly to mcurrierdesigns@gmail.com";

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage =
            "Unable to connect to email service. Please check if the Supabase edge function is deployed.";
        } else if (error.message.includes("401")) {
          errorMessage =
            "Authentication error. Please check Supabase configuration.";
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen custom-gradient-bg">
      <NavbarSimple />
      <div className="container flex flex-col p-8 pb-20 gap-16 sm:p-20 mx-auto">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-4xl font-parkinsans">Contact</h1>
          <div className="max-w-4xl w-full">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-6">
              Michelle Currier - Graphic Designer & Visual Artist
            </p>
            <div className="flex gap-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 mb-8 w-full min-w-1l"
              >
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

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-xl">Email:</h2>
                  <a
                    href="mailto:mcurrierdesigns@gmail.com"
                    className="text-teal-600 hover:text-blue-500 transition-colors"
                  >
                    mcurrierdesigns@gmail.com
                  </a>
                </div>

                <div>
                  <h2 className="font-semibold text-xl">Social Media:</h2>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="https://www.instagram.com/djnicerack/"
                      className="text-teal-600 hover:text-blue-500 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mouge/"
                      className="text-teal-600 hover:text-blue-500 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/michelle-currier/"
                      className="text-teal-600 hover:text-blue-500 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://mcurrier.com"
                      className="text-teal-600 hover:text-blue-500 transition-colors"
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="mt-8"
            >
              Back to Gallery
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
