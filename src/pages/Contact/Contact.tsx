import Header from "../../componenets/Header/Header";
import Footer from "../../componenets/Footer/Footer";
import { ChangeEvent, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceId = "service_94zvvt8";
    const templateId = "template_z5cp5vp";

    try {
      await emailjs.send(serviceId, templateId, { ...formData } as Record<string, unknown>, "LLQElBiNihID3Jufm");
      setStatus("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(`Failed to send message. Try again later.${error}`);
    }
  };
  
  return (
    <>
      <Header />
      <section className="contact h-dvh">
      <div className="container mx-auto px-4 py-52 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full shadow-lg shadow-yellow-700 rounded-full min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full shadow-lg shadow-yellow-700 rounded-full min-w-[80px] max-w-full px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 shadow-lg shadow-yellow-700 rounded-md min-w-[80px] px-3 py-2 focus:border-yellow-700 focus:outline-yellow-700"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-800 transition"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-sm">{status}</p>}
      </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
