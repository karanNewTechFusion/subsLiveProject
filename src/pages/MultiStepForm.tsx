import React, { useState, ChangeEvent } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";

const steps = ["Account Info", "Business Details", "Business Overview"];

// ✅ Frontend options matching backend validation
const BUSINESS_TYPES = [
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Masonry",
  "HVAC",
  "Painting",
  "Roofing",
  "Landscaping",
  "Other",
];

const TEAM_SIZES = [
  "1-5 People",
  "6-10 People",
  "11-20 People",
  "21-50 People",
  "51-100 People",
  "100+ People",
];

const YEARS_IN_BUSINESS = [
  "Less than 1 Year",
  "1-3 Years",
  "3-5 Years",
  "5-10 Years",
  "10+ Years",
];

interface FormData {
  email: string;
  password: string;
  fullName: string;
  contact: string;
  companyName: string;
  businessType: string;
  teamSize: string;
  yearsInBusiness: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  contact?: string;
  companyName?: string;
  businessType?: string;
  teamSize?: string;
  yearsInBusiness?: string;
}

export default function MultiStepForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullName: "",
    contact: "",
    companyName: "",
    businessType: "",
    teamSize: "",
    yearsInBusiness: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateContact = (contact: string) => /^\d{10}$/.test(contact);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
      if (!formData.password) newErrors.password = "Password is required";
    }

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full Name is required";

      if (!formData.contact) newErrors.contact = "Contact is required";
      else if (!validateContact(formData.contact))
        newErrors.contact = "Contact number must be exactly 10 digits";

      if (!formData.companyName)
        newErrors.companyName = "Company Name is required";

      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
      else if (!BUSINESS_TYPES.includes(formData.businessType))
        newErrors.businessType = "Invalid business type";
    }

    if (step === 2) {
      if (formData.teamSize && !TEAM_SIZES.includes(formData.teamSize))
        newErrors.teamSize = "Invalid team size";

      if (formData.yearsInBusiness && !YEARS_IN_BUSINESS.includes(formData.yearsInBusiness))
        newErrors.yearsInBusiness = "Invalid years in business";
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleNext = () => validateStep(activeStep) && setActiveStep((p) => p + 1);
  const handleBack = () => setActiveStep((p) => p - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "contact") {
      // allow only digits and max 10
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 10) {
        setFormData({ ...formData, contact: value });
        setErrors((prev) => ({ ...prev, contact: undefined }));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    try {
      setLoading(true);
      const res = await signup(formData);
      if (res.data.success) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error: any) {
      console.error("❌ Signup error:", error.response?.data || error);
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="new-password"
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.contact}
              helperText={errors.contact}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
            <TextField
              select
              label="Business Type"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.businessType}
              helperText={errors.businessType}
            >
              {BUSINESS_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </>
        );
      case 2:
        return (
          <>
            <TextField
              select
              label="Team Size"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.teamSize}
              helperText={errors.teamSize}
            >
              {TEAM_SIZES.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Years in Business"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.yearsInBusiness}
              helperText={errors.yearsInBusiness}
            >
              {YEARS_IN_BUSINESS.map((yrs) => (
                <MenuItem key={yrs} value={yrs}>
                  {yrs}
                </MenuItem>
              ))}
            </TextField>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-6">{renderStepContent()}</div>

      <div className="mt-6 flex justify-between">
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </div>

      <div className="mt-4 text-center">
        <Typography variant="body2">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </Typography>
      </div>
    </div>
  );
}
