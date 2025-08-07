"use client";

import Container from "@/components/Container";
import Link from "next/link";
import TextInput from "../TextInput";
import Textarea from "../Textarea";
import Button from "../Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Popup component (copied and adapted from ApplicationForm)
function SuccessPopup({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#EEECDE] rounded-[20px] shadow-2xl p-10 sm:p-12 max-w-[95vw] w-full sm:w-[600px] md:w-[700px] text-center relative animate-fade-in scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#16363D] text-3xl font-bold hover:text-red-500 focus:outline-none"
          aria-label="Close popup"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-[#16363D] text-[28px] md:text-[32px] font-semibold mb-2 uppercase">
            Message Sent!
          </h3>
          <p className="text-[#16363D] text-[18px] md:text-[20px] max-w-[600px]">
            Thank you for reaching out. We’ll get back to you soon.
          </p>
        </div>
      </div>
    </div>
  );
}

const ICONS = {
  phone: (
    <svg
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7031 15.9979C19.2795 15.7295 18.7688 15.6346 18.277 15.733C17.7853 15.8313 17.3503 16.1153 17.0625 16.526C16.0875 17.7042 14.9094 19.6542 10.4812 15.226C6.05312 10.7979 7.9625 9.57917 9.14062 8.60417C9.55132 8.31637 9.83535 7.88141 9.9337 7.38966C10.032 6.8979 9.93716 6.38716 9.66875 5.96354L6.90625 1.73854C6.54062 1.21041 6.05312 0.35729 4.91562 0.51979C3.77813 0.68229 0.8125 2.34791 0.8125 6.00417C0.8125 9.66042 3.69687 14.1292 7.6375 18.0698C11.5781 22.0104 16.0469 24.8542 19.6625 24.8542C23.2781 24.8542 25.025 21.6042 25.1469 20.7917C25.2687 19.9792 24.4562 19.1667 23.9281 18.801L19.7031 15.9979Z"
        fill="currentColor"
      />
    </svg>
  ),
  email: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.87207 17.1844C11.1721 15.9251 14.8279 15.9251 16.1279 17.1844L24.0498 25.1874H1.9502L9.87207 17.1844ZM7.6377 17.1434L0.8125 24.0096V12.2684L7.6377 17.1434ZM25.1875 24.0096L18.3623 17.1434L25.1875 12.4315V24.0096ZM21.9375 0.812378V12.6747L17.1436 15.9657C15.2342 14.1782 10.7255 14.1783 8.77539 15.9657L4.0625 12.6747V0.812378H21.9375ZM7.3125 10.5624V12.1874H18.6875V10.5624H7.3125ZM24.5781 10.8466L23.5625 11.578V9.99402L24.5781 10.8466ZM2.4375 11.4159L1.50293 10.7655L2.4375 9.99402V11.4159ZM9.75 7.31238V8.93738H18.6875V7.31238H9.75ZM7.3125 4.06238V5.68738H11.375V4.06238H7.3125Z" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 13.0794C26 5.85586 20.1797 -2.65135e-07 13 -2.65135e-07C5.82029 -2.65135e-07 0 5.85586 0 13.0794C0 19.6078 4.75391 25.0188 10.9687 26V16.8602H7.66797V13.0794H10.9687V10.1979C10.9687 6.91984 12.9096 5.10916 15.879 5.10916C17.3013 5.10916 18.7891 5.36462 18.7891 5.36462V8.58339H17.1498C15.5349 8.58339 15.0312 9.5916 15.0312 10.626V13.0794H18.6367L18.0604 16.8602H15.0312V26C21.2461 25.0188 26 19.6078 26 13.0794Z" fill="currentColor" />
    </svg>
  ),
  whatsapp: (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4985 0.013916C13.344 -0.076535 15.186 0.257213 16.8823 0.989502C18.5787 1.72182 20.0848 2.83345 21.2847 4.23853C22.4845 5.6437 23.3466 7.30574 23.8042 9.09595C24.2617 10.886 24.3027 12.7572 23.9243 14.5657C23.5459 16.3743 22.7575 18.072 21.6206 19.5286C20.4837 20.9851 19.0283 22.1618 17.3657 22.968C15.7032 23.7742 13.8775 24.1892 12.0298 24.1799C10.1822 24.1706 8.36086 23.738 6.70654 22.9153L0.602051 24.3616C0.525126 24.3797 0.444831 24.3777 0.368652 24.3567C0.292463 24.3356 0.222208 24.2966 0.165527 24.2415C0.108956 24.1865 0.0676751 24.1176 0.0444336 24.0422C0.0212469 23.9668 0.0168107 23.8862 0.0327148 23.8088L1.31689 17.5793C0.401359 15.7807 -0.049576 13.7814 0.00537109 11.7639C0.0603813 9.7463 0.619105 7.77377 1.63135 6.02759C2.64358 4.28152 4.07689 2.81623 5.80029 1.76587C7.52369 0.715549 9.48275 0.113327 11.4985 0.013916ZM8.30615 6.28345C8.17398 6.25322 8.03652 6.25427 7.90479 6.28638C7.77286 6.31856 7.64991 6.38112 7.54639 6.46899C6.8928 7.02185 6.11828 7.86163 6.02393 8.79224C5.85777 10.4331 6.56075 12.5017 9.22119 14.9846C12.2949 17.854 14.7572 18.235 16.3599 17.845C17.269 17.6248 17.9954 16.7415 18.4536 16.0188C18.5264 15.9044 18.5715 15.7747 18.5854 15.6399C18.5994 15.5049 18.5816 15.3684 18.5337 15.2415C18.4857 15.1144 18.4089 14.9995 18.3091 14.9075C18.2093 14.8155 18.0889 14.7478 17.9585 14.7102L15.6167 14.0383C15.4657 13.9951 15.3057 13.9934 15.1538 14.0334C15.002 14.0735 14.8635 14.1538 14.7534 14.2659L14.1802 14.8499C14.0624 14.9704 13.9115 15.0532 13.7466 15.0881C13.5815 15.123 13.4091 15.1079 13.2524 15.0452C12.1446 14.5981 9.81529 12.5271 9.22021 11.4895C9.13666 11.3429 9.09788 11.1744 9.10986 11.0061C9.12187 10.8378 9.18407 10.6765 9.2876 10.5432L9.78662 9.89673C9.88281 9.77232 9.94443 9.62413 9.96338 9.46802C9.9823 9.31204 9.95853 9.15371 9.89502 9.01001L8.90967 6.78149C8.85477 6.65743 8.77211 6.54755 8.66748 6.46118C8.56273 6.37476 8.43852 6.31378 8.30615 6.28345Z" fill="currentColor" />
    </svg>
  ),
};


const ContactForm = ({ data }) => {
  // data is an array of contact methods
  // Add state for form fields
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Phone: "",
    HowWeCanHelp: "",
  });
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Show popup on success
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  // Simple validation
  const validate = () => {
    const errors = {};
    // Name: required, min 2 chars, only letters, spaces, dot, hyphen
    if (!form.Name.trim()) {
      errors.Name = "Name is required.";
    } else if (form.Name.trim().length < 2) {
      errors.Name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z .'-]+$/.test(form.Name.trim())) {
      errors.Name =
        "Name can only contain letters, spaces, dot, hyphen, and apostrophe.";
    }
    // Email: required, valid format
    if (!form.Email.trim()) {
      errors.Email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.Email.trim())) {
      errors.Email = "Invalid email address.";
    }
    // Phone: required, valid phone, min 7 chars
    if (!form.Phone.trim()) {
      errors.Phone = "Phone is required.";
    } else if (!/^[\d\s()+-]{7,}$/.test(form.Phone.trim())) {
      errors.Phone = "Enter a valid phone number (min 7 digits).";
    }
    // HowWeCanHelp: required, min 10 chars
    if (!form.HowWeCanHelp.trim()) {
      errors.HowWeCanHelp = "This field is required.";
    } else if (form.HowWeCanHelp.trim().length < 10) {
      errors.HowWeCanHelp = "Please provide at least 10 characters.";
    }
    setFieldErrors(errors);
    // Scroll to first error
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name='${firstErrorKey}']`);
      if (el && el.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    if (!validate()) {
      setSubmitting(false);
      return;
    }
    // Format phone number before sending
    let formattedPhone = form.Phone;
    const phoneNumber = parsePhoneNumberFromString("+" + form.Phone);
    if (phoneNumber) {
      formattedPhone = phoneNumber.formatInternational(); // e.g., '+1 945 102 1388'
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
        }/api/contact-forms`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { ...form, Phone: formattedPhone } }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);
      setShowPopup(true);
      setForm({ Name: "", Email: "", Phone: "", HowWeCanHelp: "" });
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pb-[84px]">
      <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <Container>
        <div className="flex gap-3 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[362px]">
            <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {Array.isArray(data) &&
                data.map((item) => (

                  <li className="group" key={item.id}>
                    <div className="h-full lg:h-auto transition p-4 rounded-[16px] gap-[30px] lg:gap-[46px] bg-[#E9F5AC] lg:bg-[rgba(255,255,255,0.07)] flex flex-col justify-between text-center text-[#16363D] lg:text-[#E9F5AC] group-hover:bg-[#E9F5AC] group-hover:text-[#16363D]">
                      <label className="text-[14px] md:text-[16px] leading-[120%] -tracking-[.03em] font-semibold font-Archivo ">
                        {item.Title}
                      </label>
                      <div className="grid gap-3 justify-center">
                        {item.Title && (
                          <i className="mx-auto">
                            {ICONS[
                              item.Title.toLowerCase().includes("phone")
                                ? "phone"
                                : item.Title.toLowerCase().includes("email")
                                  ? "email"
                                  : item.Title.toLowerCase().includes("facebook")
                                    ? "facebook"
                                    : item.Title.toLowerCase().includes("whatsapp")
                                      ? "whatsapp"
                                      : ""
                            ]}
                          </i>
                        )}
                        {item.Title.toLowerCase().includes("email") &&
                          item.Info ? (
                          <Link
                            href={`mailto:${item.Info}`}
                            className="font-Archivo font-medium text-[18px] lg:text-[22px] leading-[120%] -tracking-[.03em] "
                          >
                            {item.Info}
                          </Link>
                        ) : item.Info ? (
                          <span className="font-Archivo font-medium text-[18px] lg:text-[22px] leading-[120%] -tracking-[.03em] ">
                            {item.Info}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-full lg:w-[calc(100%-374px)] p-6 lg:p-10 rounded-[16px] bg-[rgba(255,255,255,0.07)]">
            <h2 className="text-[#EEECDE] text-[28px] lg:text-[48px] leading-[112%] uppercase mb-[30px] block text-center">
              Fill the form
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-3 contactForm">
                <TextInput
                  placeholder="Your name"
                  name="Name"
                  value={form.Name}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.Name && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.Name}
                  </div>
                )}
                <TextInput
                  placeholder="Your email address"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  required
                  type="email"
                />
                {fieldErrors.Email && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.Email}
                  </div>
                )}
                {/* Phone input with country flag and code */}
                <div>
                  <PhoneInput
                    country={"us"}
                    value={form.Phone}
                    onChange={(phone, data) => {
                      setForm((prev) => ({ ...prev, Phone: phone }));
                      setPhoneCountry(data.countryCode || "us");
                      setFieldErrors((prev) => ({ ...prev, Phone: undefined }));
                    }}
                    inputProps={{
                      name: "Phone",
                      required: true,
                      autoFocus: false,
                    }}
                    inputClass="custom-phone-input"
                    buttonClass="custom-phone-flag-btn"
                    containerClass="custom-phone-container"
                    dropdownClass="custom-phone-dropdown"
                    placeholder="xxx xx xx"
                    specialLabel=""
                    enableSearch
                    disableSearchIcon={false}
                  />
                  {fieldErrors.Phone && (
                    <div className="text-red-600 text-xs mt-1">
                      {fieldErrors.Phone}
                    </div>
                  )}
                </div>
                <Textarea
                  placeholder="How can we help?"
                  name="HowWeCanHelp"
                  value={form.HowWeCanHelp}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.HowWeCanHelp && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.HowWeCanHelp}
                  </div>
                )}
                <button
                  className="bg-[#E9F5AC] border-1 border-[#E9F5AC] text-[14px] lg:text-[18px] text-[#16363D] font-semibold tracking-[.02em] \
                  uppercase leading-[100%] block rounded-full w-full p-[15px] lg:p-5 mt-[18px] font-Archivo h-[44px] lg:h-[60px]"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "SEND MESSAGE"}
                </button>
                {success && (
                  <div className="text-green-600 text-center mt-2">
                    Thank you! We’ll be in touch soon.
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-center mt-2">{error}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
