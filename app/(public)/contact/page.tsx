"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Button,
  Tooltip,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { contactContent } from "@/app/util/content";

export default function ContactPage() {
  const [disabled, setDisabled] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    message: "",
  });
  const handleChange = (evt: { target: { name: any; value: any } }) => {
    setFormError(false);
    const name = evt.target.name;
    const value = evt.target.value;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const { email, message } = formData;
    try {
      setDisabled(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email != "" && message !== "" && emailRegex.test(email)) {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          toast.info("Message Sent Successfully!");
        } else {
          setFormError(true);
          toast.error("Please Enter Valid Details!");
        }
      } else {
        setFormError(true);
        toast.error("Please Enter Valid Details!");
      }
    } catch (e) {
      console.error(e);
      // Display error alert
    } finally {
      // Re-enable form submission
      setDisabled(false);
    }
  };
  return (
    <div id="home" className="text-base-content">
      <div className="flex   items-center justify-center">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="flex items-center justify-center pb-4"></div>
            <a
              href="#"
              className="mb-2 inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400"
            >
              {contactContent.icon} &nbsp; {contactContent.prefix}
            </a>
            <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              {contactContent.title}
            </h2>
            {contactContent.text.map((item: any, index: any) => (
              <p
                key={`homeproject${index}`}
                className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl"
              >
                {item}
              </p>
            ))}
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-4 pt-4">
              {contactContent?.social?.map((item, index) => (
                <Link
                  key={`contactSocial${index}`}
                  href={item.link}
                  target="_blank"
                >
                  <Tooltip content={item.text}>
                    <motion.button
                      className="text-lg  text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.button>
                  </Tooltip>
                </Link>
              ))}
            </div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-4 pt-4">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-8 mt-6">
                  <form
                    className="flex flex-col dark:text-black text-left"
                    onSubmit={async (event) => {}}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Send a Message
                    </h2>
                    <div className="w-96 text-left">
                      <div className="mb-2 block">
                        <Label htmlFor="email" value="Your E-mail" />
                      </div>
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@ganesan.dev"
                        required
                        onChange={handleChange}
                        disabled={disabled}
                        color={formError ? "failure" : ""}
                        helperText={
                          <> {formError && "Enter Valid Your E-mail Address!"}</>
                        }
                      />

                      <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your message" />
                      </div>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message..."
                        required
                        rows={4}
                        onChange={handleChange}
                        disabled={disabled}
                        color={formError ? "failure" : ""}
                        helperText={
                          <> {formError && "Enter your Message!"}</>
                        }
                      />
                    </div>
                    <div className="mb-2 block">
                      <Button
                        color="blue"
                        className="mt-3"
                        pill
                        onClick={onSubmit}
                        disabled={disabled}
                        isProcessing={disabled}
                      >
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-4 "></div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-3/6 w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
      </div>

      <div className="mx-auto max-w-screen-lg px-4  text-left "></div>
    </div>
  );
}
