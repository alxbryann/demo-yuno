"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { renderFormField } from "@/components/screens/render-form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import type { FormFieldType } from "@/types";
import { ColorPickerFormDemo } from "@/components/theme-picker";

const STORAGE_KEY = "local-theme-config";

export default function Page() {
  const [themeVars, setThemeVars] = useState<Record<string, string>>({});

  const saveTheme = (newVars: Record<string, string>) => {
    setThemeVars(newVars);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setThemeVars(JSON.parse(saved));
    }
  }, []);

  const formFields: FormFieldType[] = [
    {
      checked: true,
      description: "Enter your full name.",
      disabled: false,
      label: "Full Name",
      name: "name_7039650367",
      placeholder: "John Doe",
      required: true,
      rowIndex: 0,
      type: "",
      value: "",
      variant: "Input",
      setValue: () => {},
      onChange: () => {},
      onSelect: () => {},
    },
    {
      checked: true,
      description: "Enter your credit card information.",
      disabled: false,
      label: "Card Details",
      name: "name_2917242264",
      placeholder: "Placeholder",
      required: true,
      rowIndex: 0,
      type: "",
      value: "",
      variant: "Credit Card",
      setValue: () => {},
      onChange: () => {},
      onSelect: () => {},
    },
  ];

  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <ColorPickerFormDemo onSave={saveTheme} />
      <div style={themeVars as React.CSSProperties}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Formulario</CardTitle>
            <CardDescription>Completa los campos requeridos</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
                className="space-y-4"
              >
                {formFields.map((field) => (
                  <div key={field.name}>{renderFormField(field)}</div>
                ))}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
