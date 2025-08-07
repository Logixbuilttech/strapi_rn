"use client";

import { useState, useEffect } from "react";
import BackgroundBlock from "../BackgroundBlock";
import Container from "@/components/Container";
import TextInput from "../TextInput";
import Textarea from "../Textarea";
import RadioButton from "../RadioButton";
import { useDropzone } from "react-dropzone";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import TurnstileWidget from "./TurnstileWidget";
import DOMPurify from "dompurify";

// Popup component
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
            Application Submitted!
          </h3>
          <p className="text-[#16363D] text-[18px] md:text-[20px] max-w-[600px]">
            Thank you for your submission. We’ll review your application and get
            back to you soon.
          </p>
        </div>
      </div>
    </div>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s()+-]{7,}$/; // Basic phone validation

const ApplicationForm = ({ industryFocusTabs, supportNeededTabs }) => {
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    projectDescription: "",
    reasonForPartnership: "",
    IndustryTab: "", // now a text field
    SupportTab: "", // now a text field
    attachments: [],
  });
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const requiredFields = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone" },
    { key: "projectDescription", label: "Project Description" },
    { key: "reasonForPartnership", label: "Reason For Partnership" },
  ];

  const validateForm = () => {
    const errors = {};
    if (!form.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }
    if (!form.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      errors.phone = "Phone is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!form.projectDescription.trim()) {
      errors.projectDescription = "Project Description is required.";
    }
    if (!form.reasonForPartnership.trim()) {
      errors.reasonForPartnership = "Reason For Partnership is required.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Scroll to first error field
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name='${firstErrorKey}']`);
      if (el && el.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (type === "file") {
      // Not used anymore, handled by dropzone
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Single-select for industry focus
  const handleIndustryFocus = (id) => {
    const tab = industryFocusTabs.find((tab) => tab.id === id);
    setForm((prev) => ({ ...prev, IndustryTab: tab ? tab.Title : "" }));
  };

  // Single-select for support needed
  const handleSupportNeeded = (id) => {
    const tab = supportNeededTabs.find((tab) => tab.id === id);
    setForm((prev) => ({ ...prev, SupportTab: tab ? tab.Title : "" }));
  };

  // Dropzone logic for multiple files
  const onDrop = (acceptedFiles, fileRejections) => {
    if (acceptedFiles.length + form.attachments.length > 5) {
      setFileError("Maximum 5 attachments are allowed.");
      return;
    }
    setFileError(null);
    setForm((prev) => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        ...acceptedFiles.slice(0, 5 - prev.attachments.length),
      ],
    }));
  };

  const removeAttachment = (index) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    multiple: true,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    setValidationError(null);

    const isValid = validateForm();
    if (!isValid) {
      setSubmitting(false);
      return;
    }

    try {
      // Step 1: Upload files and get their IDs
      const uploadedFileIds = await Promise.all(
        form.attachments.map(async (file) => {
          const fileFormData = new FormData();
          fileFormData.append("files", file);
          const uploadRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
            {
              method: "POST",
              body: fileFormData,
            }
          );
          if (!uploadRes.ok) throw new Error("File upload failed");
          const uploadData = await uploadRes.json();
          return uploadData[0].id; // Assuming the response contains the file ID
        })
      );

      // Step 2: Prepare the data payload with file IDs
      // Format phone number before sending
      let formattedPhone = form.phone;
      const phoneNumber = parsePhoneNumberFromString("+" + form.phone);
      if (phoneNumber) {
        formattedPhone = phoneNumber.formatInternational(); // e.g., '+1 945 102 1388'
      }
      const sanitize = (value) => DOMPurify.sanitize(value.trim());
      const data = {
        fullName: sanitize(form.fullName),
        businessName: sanitize(form.businessName),
        email: sanitize(form.email),
        phone: formattedPhone,
        website: sanitize(form.website),
        projectDescription: sanitize(form.projectDescription),
        reasonForPartnership: sanitize(form.reasonForPartnership),
        IndustryTab: sanitize(form.IndustryTab),
        SupportTab: sanitize(form.SupportTab),
        attachment: uploadedFileIds,
        turnstileToken,
      };
      // Step 3: Create the entry
      const createRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/partnership-applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      if (!createRes.ok) throw new Error("Failed to create application");
      setSuccess(true);
      setShowPopup(true);
      setForm({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        website: "",
        projectDescription: "",
        reasonForPartnership: "",
        IndustryTab: "",
        SupportTab: "",
        attachments: [],
      });
      setValidationError(null);
      setError(null);
      setFileError(null);
      setTurnstileToken(""); // reset token
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-close popup after 4 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <BackgroundBlock>
      <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <Container>
        <div className="flex pb-12 lg:pb-[64px]">
          <span
            className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2  text-[#EEECDE] break-words text-[10px] md:text-[14px] lg:text-[18px] tracking-[.02em] leading-[100%] font-semibold 
          !font-Archivo uppercase"
          >
            Let’s start with your vision
          </span>
          <h2 className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2 text-[#EEECDE] text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] uppercase leading-[113%]">
            Ready to Build the <br /> Future Together?
          </h2>
        </div>
        <div className="bg-[#EEECDE] rounded-[16px] lg:p-10 p-6">
          <h2 className="text-[24px] md:text-[28px] lg:text-[48px] text-[#16363D] leading-[113%] uppercase mb-5 lg:mb-[30px] block text-center">
            Strategic Partnership Application
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {validationError && (
              <div className="text-red-600 mb-2 text-center">
                {validationError}
              </div>
            )}
            <div className="grid gap-3 lg:grid-cols-2 pb-3">
              <div>
                <TextInput
                  placeholder="Full Name *"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.fullName && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.fullName}
                  </div>
                )}
              </div>
              <div>
                <TextInput
                  placeholder="Business or Project Name (if applicable)"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  placeholder="Email Address *"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
                {fieldErrors.email && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.email}
                  </div>
                )}
              </div>
              <div>
                {/* Phone input with country flag and code */}
                <PhoneInput
                  country={"us"}
                  value={form.phone}
                  onChange={(phone, data) => {
                    setForm((prev) => ({ ...prev, phone: phone }));
                    setPhoneCountry(data.countryCode || "us");
                    setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  inputClass="custom-phone-input"
                  buttonClass="custom-phone-flag-btn"
                  containerClass="custom-phone-container phone-fill"
                  dropdownClass="custom-phone-dropdown"
                  placeholder="xxx xx xx"
                  specialLabel=""
                  enableSearch
                  disableSearchIcon={false}
                />
                {fieldErrors.phone && (
                  <div className="text-red-600 text-xs mt-1">
                    {fieldErrors.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="pb-5 lg:pb-[30px]">
              <TextInput
                placeholder="Website or Portfolio Link (optional)"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-6 mb-5 md:mb-6 lg:mb-[30px]">
              <h4 className="text-[#16363D] font-medium text-[14px] lg:text-[22px] leading-[120%] tracking-[-.03em] !font-Archivo">
                Industry Focus
              </h4>
              <div className="flex gap-3 flex-wrap">
                {industryFocusTabs?.map((tab) => (
                  <RadioButton
                    key={tab.id}
                    name="industryFocus"
                    id={`industry-${tab.id}`}
                    label={tab.Title}
                    checked={form.IndustryTab === tab.Title}
                    onChange={() => handleIndustryFocus(tab.id)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-5 md:mb-6 lg:mb-[30px]">
              <Textarea
                placeholder="Describe Your Project or Business *"
                name="projectDescription"
                value={form.projectDescription}
                onChange={handleChange}
                required
              />
              {fieldErrors.projectDescription && (
                <div className="text-red-600 text-xs mt-1">
                  {fieldErrors.projectDescription}
                </div>
              )}
            </div>
            <div className="grid gap-6 mb-5 md:mb-6 lg:mb-[30px]">
              <h4 className="text-[#16363D] font-medium text-[14px] lg:text-[22px] leading-[120%] tracking-[-.03em] !font-Archivo">
                What Support Are You Seeking?
              </h4>
              <div className="flex gap-3 flex-wrap">
                {supportNeededTabs?.map((tab) => (
                  <RadioButton
                    key={tab.id}
                    name="supportNeeded"
                    id={`support-${tab.id}`}
                    label={tab.Title}
                    checked={form.SupportTab === tab.Title}
                    onChange={() => handleSupportNeeded(tab.id)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-5 md:mb-6 lg:mb-[30px]">
              <Textarea
                placeholder="Why Do You Want to Partner with RenewEdge-Solutions? *"
                name="reasonForPartnership"
                value={form.reasonForPartnership}
                onChange={handleChange}
                required
              />
              {fieldErrors.reasonForPartnership && (
                <div className="text-red-600 text-xs mt-1">
                  {fieldErrors.reasonForPartnership}
                </div>
              )}
            </div>
            {/* Drag and Drop File Upload */}
            <div className="mb-[30px]">
              <label className="block mb-2 text-[#16363D] font-medium text-[16px]">
                Upload Pitch Deck or Additional Materials (optional)
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-[8px] p-6 text-center cursor-pointer transition-colors duration-200 ${
                  isDragActive
                    ? "border-[#16363D] bg-[#F5F5F5]"
                    : "border-[#C7C7B6] bg-[#F8F8E6]"
                }`}
                style={{ minHeight: 80 }}
              >
                <input {...getInputProps()} name="attachments" />
                {form.attachments && form.attachments.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {form.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-[#E9F5AC] px-2 py-1 rounded"
                      >
                        <span className="text-[#16363D] text-sm">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          className="text-[#16363D] hover:text-red-600 text-xs font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAttachment(idx);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <span className="text-[#16363D]">
                      Drag or{" "}
                      <span className="underline text-[#16363D]">Upload</span>{" "}
                      files here
                    </span>
                    <div className="text-[#A0A08B] text-[12px] mt-1">
                      Maximum 5 attachments are allowed.
                    </div>
                  </>
                )}
              </div>
              {fileError && (
                <div className="text-red-600 text-sm mt-1">{fileError}</div>
              )}
            </div>
            <div className="mb-5 flex justify-center">
              <TurnstileWidget
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-[#16363D] border-1 border-[#16363D] text-[14px] lg:text-[18px] text-[#EEECDE] font-semibold 
              tracking-[.02em] uppercase leading-[100%] block rounded-full w-full p-[15px] lg:p-5"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Your Pitch"}
              </button>
              {success && (
                <div className="text-green-600 mt-2 text-center">
                  Application submitted successfully!
                </div>
              )}
              {error && (
                <div className="text-red-600 mt-2 text-center">{error}</div>
              )}
            </div>
          </form>
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default ApplicationForm;
