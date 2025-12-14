import type { FieldType } from "@/types";

export const FORM_LIBRARIES = {
  SERVER_ACTIONS: "server-actions",
  REACT_HOOK_FORM: "react-hook-form",
  TANSTACK_FORM: "tanstack-form",
  BRING_YOUR_OWN: "bring-your-own",
} as const;

export type FormLibrary = (typeof FORM_LIBRARIES)[keyof typeof FORM_LIBRARIES];

export const FORM_LIBRARY_LABELS = {
  [FORM_LIBRARIES.SERVER_ACTIONS]: "Server Actions",
  [FORM_LIBRARIES.REACT_HOOK_FORM]: "React Hook Form",
  [FORM_LIBRARIES.TANSTACK_FORM]: "TanStack Form",
  [FORM_LIBRARIES.BRING_YOUR_OWN]: "Bring Your Own Form",
};

export const fieldTypes: FieldType[] = [
  { name: "Input", isNew: false },
  { name: "Email", isNew: false },
  { name: "Phone", isNew: false },
  { name: "Select", isNew: false },
  { name: "Multi Select", isNew: false },
  { name: "Payment Method Selector", isNew: false },
  { name: "Credit Card", isNew: false },
  { name: "PayPal", isNew: false },
  { name: "Apple Pay", isNew: false },
  { name: "Google Pay", isNew: false },
  { name: "Date Picker", isNew: false },
  { name: "Textarea", isNew: false },
  { name: "Checkbox", isNew: false },
  { name: "Input OTP", isNew: false },
  { name: "Combobox", isNew: false },
  { name: "Switch", isNew: false },
  { name: "Coupon Code", isNew: true },
  { name: "Amount Input", isNew: true },
  { name: "Currency Select", isNew: true },
];

export const defaultFieldConfig: Record<
  string,
  { label: string; description: string; placeholder?: any }
> = {
  Input: {
    label: "Full Name",
    description: "Enter your full name.",
    placeholder: "John Doe",
  },
  Email: {
    label: "Email Address",
    description: "We will send your receipt to this email.",
    placeholder: "john@example.com",
  },
  Phone: {
    label: "Phone Number",
    description: "Contact number for billing.",
    placeholder: "+1 (555) 000-0000",
  },
  Select: {
    label: "Billing Country",
    description: "Select your country for billing.",
    placeholder: "Select a country",
  },
  "Multi Select": {
    label: "Payment Options",
    description: "Select additional payment options.",
  },
  "Payment Method Selector": {
    label: "Select Payment Method",
    description: "Choose your preferred payment method.",
    placeholder: "Select payment method",
  },
  "Credit Card": {
    label: "Card Details",
    description: "Enter your credit card information.",
  },
  PayPal: {
    label: "PayPal Account",
    description: "Sign in with your PayPal account.",
  },
  "Apple Pay": {
    label: "Apple Pay",
    description: "Complete payment with Apple Pay.",
  },
  "Google Pay": {
    label: "Google Pay",
    description: "Complete payment with Google Pay.",
  },
  "Date Picker": {
    label: "Transaction Date",
    description: "Select the date for this payment.",
  },
  Textarea: {
    label: "Billing Address",
    description: "Enter your complete billing address.",
    placeholder: "Street, City, State, ZIP",
  },
  Checkbox: {
    label: "I agree to the payment terms",
    description: "Please review and accept our terms.",
  },
  "Input OTP": {
    label: "Verification Code",
    description: "Enter the verification code sent to your email.",
  },
  Combobox: {
    label: "State/Province",
    description: "Search and select your state.",
  },
  Switch: {
    label: "Same as billing address",
    description: "Use the same address for billing.",
  },
  "Coupon Code": {
    label: "Discount Code",
    description: "Enter a coupon or promo code.",
    placeholder: "PROMO2024",
  },
  "Amount Input": {
    label: "Payment Amount",
    description: "Enter the amount to be charged.",
    placeholder: "0.00",
  },
  "Currency Select": {
    label: "Currency",
    description: "Select your preferred currency.",
    placeholder: "Select currency",
  },
};
