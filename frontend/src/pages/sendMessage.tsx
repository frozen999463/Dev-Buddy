import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SendMessage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const targetEmail = searchParams.get("to") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending message to:", targetEmail, formData);
    
    // Placeholder for actual send logic
    toast.success(`Message sent to ${targetEmail}!`);
    
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Contact
        </Button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
          <div className="bg-indigo-600 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Mail className="h-8 w-8" />
              Send Message
            </h1>
            <p className="mt-2 text-indigo-100">
              Sending to: <span className="font-semibold text-white">{targetEmail}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <User className="h-4 w-4" /> Your Name
                </label>
                <Input
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl border-neutral-200 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Your Email
                </label>
                <Input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border-neutral-200 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Subject</label>
              <Input
                required
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="rounded-xl border-neutral-200 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Message
              </label>
              <Textarea
                required
                placeholder="Write your message here..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-2xl border-neutral-200 focus:ring-indigo-500 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
