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
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="text-white bg-gradient-to-r bg-blue-500 hover:bg-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
