import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { FormFieldType } from "@/types";
import { format } from "date-fns";

const countries = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Mexico", value: "MX" },
  { label: "Spain", value: "ES" },
  { label: "United Kingdom", value: "GB" },
];

const paymentMethods = [
  { label: "Credit Card", value: "credit_card" },
  { label: "PayPal", value: "paypal" },
  { label: "Apple Pay", value: "apple_pay" },
  { label: "Google Pay", value: "google_pay" },
];

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "MXN - Mexican Peso", value: "MXN" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
];

const paymentOptions = [
  { label: "Split Payment", value: "split_payment" },
  { label: "Installments", value: "installments" },
  { label: "Save Card for Future", value: "save_card" },
];

const states = [
  { label: "California", value: "CA" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
  { label: "New York", value: "NY" },
];

export const renderFormField = (field: FormFieldType) => {
  const [value, setValue] = useState(field.value || "");
  const [checked, setChecked] = useState(field.checked || false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(field.value) ? field.value : [],
  );
  const [date, setDate] = useState<Date | undefined>(
    field.value instanceof Date ? field.value : undefined,
  );
  const [otp, setOtp] = useState("");
  const [creditCard, setCreditCard] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [applePayData, setApplePayData] = useState({
    token: "",
    deviceId: "",
  });
  const [googlePayData, setGooglePayData] = useState({
    token: "",
    accountId: "",
  });
  const [openCombobox, setOpenCombobox] = useState(false);

  const handleChange = (newValue: string | boolean | Date | string[]) => {
    setValue(newValue);
    field.onChange(newValue);
  };

  const handleMultiSelect = (selectedValue: string) => {
    const updated = selectedValues.includes(selectedValue)
      ? selectedValues.filter((v) => v !== selectedValue)
      : [...selectedValues, selectedValue];
    setSelectedValues(updated);
    field.onChange(updated);
  };

  const handleCardChange = (fieldName: string, fieldValue: string) => {
    const updated = { ...creditCard, [fieldName]: fieldValue };
    setCreditCard(updated);
    field.onChange(updated);
  };

  const handleApplePayChange = (fieldName: string, fieldValue: string) => {
    const updated = { ...applePayData, [fieldName]: fieldValue };
    setApplePayData(updated);
    field.onChange(updated);
  };

  const handleGooglePayChange = (fieldName: string, fieldValue: string) => {
    const updated = { ...googlePayData, [fieldName]: fieldValue };
    setGooglePayData(updated);
    field.onChange(updated);
  };

  const formatCardNumber = (num: string) => {
    return num
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  switch (field.variant) {
    case "Input":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            required={field.required}
          />
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Email":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            placeholder={field.placeholder || "email@example.com"}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            required={field.required}
            type="email"
          />
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Phone":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            placeholder={field.placeholder || "+1 (555) 000-0000"}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            required={field.required}
            type="tel"
          />
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Select":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Select value={value as string} onValueChange={handleChange}>
            <SelectTrigger id={field.name} disabled={field.disabled}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Multi Select":
      return (
        <div className="space-y-3">
          <Label>{field.label}</Label>
          <div className="space-y-2">
            {paymentOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={() => handleMultiSelect(option.value)}
                  disabled={field.disabled}
                />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Payment Method Selector":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select
              value={selectedPaymentMethod}
              onValueChange={(method) => {
                setSelectedPaymentMethod(method);
                handleChange(method);
              }}
            >
              <SelectTrigger id={field.name} disabled={field.disabled}>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>

          {selectedPaymentMethod === "credit_card" && (
            <div className="space-y-4 pt-4 border-t">
              <Label>Credit Card Details</Label>

              <div className="space-y-2">
                <Label htmlFor="cardholder" className="text-xs">
                  Cardholder Name
                </Label>
                <Input
                  id="cardholder"
                  placeholder="John Doe"
                  value={creditCard.cardholderName}
                  onChange={(e) =>
                    handleCardChange("cardholderName", e.target.value)
                  }
                  disabled={field.disabled}
                  required={field.required}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardnumber" className="text-xs">
                  Card Number
                </Label>
                <Input
                  id="cardnumber"
                  placeholder="1234 5678 9012 3456"
                  value={formatCardNumber(creditCard.cardNumber)}
                  onChange={(e) =>
                    handleCardChange(
                      "cardNumber",
                      e.target.value.replace(/\s/g, ""),
                    )
                  }
                  disabled={field.disabled}
                  required={field.required}
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="month" className="text-xs">
                    Month
                  </Label>
                  <Input
                    id="month"
                    placeholder="MM"
                    value={creditCard.expiryMonth}
                    onChange={(e) =>
                      handleCardChange("expiryMonth", e.target.value)
                    }
                    disabled={field.disabled}
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-xs">
                    Year
                  </Label>
                  <Input
                    id="year"
                    placeholder="YY"
                    value={creditCard.expiryYear}
                    onChange={(e) =>
                      handleCardChange("expiryYear", e.target.value)
                    }
                    disabled={field.disabled}
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-xs">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={creditCard.cvv}
                    onChange={(e) => handleCardChange("cvv", e.target.value)}
                    disabled={field.disabled}
                    required={field.required}
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedPaymentMethod === "paypal" && (
            <div className="space-y-4 pt-4 border-t">
              <Label>PayPal Account</Label>

              <div className="space-y-2">
                <Label htmlFor="paypal-email" className="text-xs">
                  PayPal Email
                </Label>
                <Input
                  id="paypal-email"
                  placeholder="your-email@paypal.com"
                  value={paypalEmail}
                  onChange={(e) => {
                    setPaypalEmail(e.target.value);
                    field.onChange(e.target.value);
                  }}
                  disabled={field.disabled}
                  required={field.required}
                  type="email"
                />
              </div>

              <Button
                variant="outline"
                className="w-full"
                disabled={field.disabled || !paypalEmail}
              >
                Connect PayPal Account
              </Button>
            </div>
          )}

          {selectedPaymentMethod === "apple_pay" && (
            <div className="space-y-4 pt-4 border-t">
              <Label>Apple Pay</Label>

              <div className="space-y-2">
                <Label htmlFor="apple-token" className="text-xs">
                  Payment Token
                </Label>
                <Input
                  id="apple-token"
                  placeholder="Apple Pay token"
                  value={applePayData.token}
                  onChange={(e) =>
                    handleApplePayChange("token", e.target.value)
                  }
                  disabled={field.disabled}
                  required={field.required}
                  type="password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apple-device" className="text-xs">
                  Device ID
                </Label>
                <Input
                  id="apple-device"
                  placeholder="Your device identifier"
                  value={applePayData.deviceId}
                  onChange={(e) =>
                    handleApplePayChange("deviceId", e.target.value)
                  }
                  disabled={field.disabled}
                  required={field.required}
                />
              </div>

              <Button
                variant="outline"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={field.disabled || !applePayData.token}
              >
                Pay with Apple Pay
              </Button>
            </div>
          )}

          {selectedPaymentMethod === "google_pay" && (
            <div className="space-y-4 pt-4 border-t">
              <Label>Google Pay</Label>

              <div className="space-y-2">
                <Label htmlFor="google-token" className="text-xs">
                  Payment Token
                </Label>
                <Input
                  id="google-token"
                  placeholder="Google Pay token"
                  value={googlePayData.token}
                  onChange={(e) =>
                    handleGooglePayChange("token", e.target.value)
                  }
                  disabled={field.disabled}
                  required={field.required}
                  type="password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-account" className="text-xs">
                  Google Account ID
                </Label>
                <Input
                  id="google-account"
                  placeholder="Your Google account identifier"
                  value={googlePayData.accountId}
                  onChange={(e) =>
                    handleGooglePayChange("accountId", e.target.value)
                  }
                  disabled={field.disabled}
                  required={field.required}
                />
              </div>

              <Button
                variant="outline"
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                disabled={field.disabled || !googlePayData.token}
              >
                Pay with Google Pay
              </Button>
            </div>
          )}
        </div>
      );

    case "Credit Card":
      return (
        <div className="space-y-4">
          <Label>{field.label}</Label>

          <div className="space-y-2">
            <Label htmlFor="cardholder" className="text-xs">
              Cardholder Name
            </Label>
            <Input
              id="cardholder"
              placeholder="John Doe"
              value={creditCard.cardholderName}
              onChange={(e) =>
                handleCardChange("cardholderName", e.target.value)
              }
              disabled={field.disabled}
              required={field.required}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardnumber" className="text-xs">
              Card Number
            </Label>
            <Input
              id="cardnumber"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(creditCard.cardNumber)}
              onChange={(e) =>
                handleCardChange(
                  "cardNumber",
                  e.target.value.replace(/\s/g, ""),
                )
              }
              disabled={field.disabled}
              required={field.required}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Label htmlFor="month" className="text-xs">
                Month
              </Label>
              <Input
                id="month"
                placeholder="MM"
                value={creditCard.expiryMonth}
                onChange={(e) =>
                  handleCardChange("expiryMonth", e.target.value)
                }
                disabled={field.disabled}
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs">
                Year
              </Label>
              <Input
                id="year"
                placeholder="YY"
                value={creditCard.expiryYear}
                onChange={(e) => handleCardChange("expiryYear", e.target.value)}
                disabled={field.disabled}
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-xs">
                CVV
              </Label>
              <Input
                id="cvv"
                placeholder="123"
                value={creditCard.cvv}
                onChange={(e) => handleCardChange("cvv", e.target.value)}
                disabled={field.disabled}
                required={field.required}
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "PayPal":
      return (
        <div className="space-y-4">
          <Label>{field.label}</Label>

          <div className="space-y-2">
            <Label htmlFor="paypal-email" className="text-xs">
              PayPal Email
            </Label>
            <Input
              id="paypal-email"
              placeholder="your-email@paypal.com"
              value={paypalEmail}
              onChange={(e) => {
                setPaypalEmail(e.target.value);
                field.onChange(e.target.value);
              }}
              disabled={field.disabled}
              required={field.required}
              type="email"
            />
          </div>

          <Button
            variant="outline"
            className="w-full"
            disabled={field.disabled || !paypalEmail}
          >
            Connect PayPal Account
          </Button>

          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Apple Pay":
      return (
        <div className="space-y-4">
          <Label>{field.label}</Label>

          <div className="space-y-2">
            <Label htmlFor="apple-token" className="text-xs">
              Payment Token
            </Label>
            <Input
              id="apple-token"
              placeholder="Apple Pay token"
              value={applePayData.token}
              onChange={(e) => handleApplePayChange("token", e.target.value)}
              disabled={field.disabled}
              required={field.required}
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apple-device" className="text-xs">
              Device ID
            </Label>
            <Input
              id="apple-device"
              placeholder="Your device identifier"
              value={applePayData.deviceId}
              onChange={(e) => handleApplePayChange("deviceId", e.target.value)}
              disabled={field.disabled}
              required={field.required}
            />
          </div>

          <Button
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={field.disabled || !applePayData.token}
          >
            Pay with Apple Pay
          </Button>

          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Google Pay":
      return (
        <div className="space-y-4">
          <Label>{field.label}</Label>

          <div className="space-y-2">
            <Label htmlFor="google-token" className="text-xs">
              Payment Token
            </Label>
            <Input
              id="google-token"
              placeholder="Google Pay token"
              value={googlePayData.token}
              onChange={(e) => handleGooglePayChange("token", e.target.value)}
              disabled={field.disabled}
              required={field.required}
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="google-account" className="text-xs">
              Google Account ID
            </Label>
            <Input
              id="google-account"
              placeholder="Your Google account identifier"
              value={googlePayData.accountId}
              onChange={(e) =>
                handleGooglePayChange("accountId", e.target.value)
              }
              disabled={field.disabled}
              required={field.required}
            />
          </div>

          <Button
            variant="outline"
            className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
            disabled={field.disabled || !googlePayData.token}
          >
            Pay with Google Pay
          </Button>

          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Date Picker":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={field.name}
                variant="outline"
                className="w-full justify-start"
                disabled={field.disabled}
              >
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  handleChange(selectedDate || new Date());
                }}
                disabled={field.disabled}
              />
            </PopoverContent>
          </Popover>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Textarea":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            required={field.required}
            rows={4}
          />
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Checkbox":
      return (
        <div className="flex items-start space-x-2">
          <Checkbox
            id={field.name}
            checked={checked}
            onCheckedChange={(isChecked) => {
              setChecked(isChecked as boolean);
              handleChange(isChecked as boolean);
            }}
            disabled={field.disabled}
            required={field.required}
          />
          <div>
            <Label htmlFor={field.name} className="cursor-pointer">
              {field.label}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>
        </div>
      );

    case "Switch":
      return (
        <div className="flex items-center justify-between">
          <div>
            <Label>{field.label}</Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>
          <Switch
            checked={checked}
            onCheckedChange={(isChecked) => {
              setChecked(isChecked);
              handleChange(isChecked);
            }}
            disabled={field.disabled}
          />
        </div>
      );

    case "Input OTP":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              handleChange(value);
            }}
            disabled={field.disabled}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Combobox":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button
                id={field.name}
                variant="outline"
                className="w-full justify-between"
                disabled={field.disabled}
              >
                {value || field.placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {states.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        handleChange(currentValue);
                        setOpenCombobox(false);
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Coupon Code":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <div className="flex gap-2">
            <Input
              id={field.name}
              placeholder={field.placeholder || "Enter code"}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={field.disabled}
              className="flex-1"
            />
            <Button variant="secondary" disabled={field.disabled || !value}>
              Apply
            </Button>
          </div>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Amount Input":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id={field.name}
              placeholder={field.placeholder || "0.00"}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={field.disabled}
              required={field.required}
              type="number"
              step="0.01"
              className="pl-8"
            />
          </div>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "Currency Select":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Select value={value as string} onValueChange={handleChange}>
            <SelectTrigger id={field.name} disabled={field.disabled}>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      );

    default:
      return <div>Field type not supported: {field.variant}</div>;
  }
};
