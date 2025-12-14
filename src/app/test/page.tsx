"use client";

import { useEffect } from "react";
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

export default function Page() {
  useEffect(() => {
    const root = document.documentElement;

    // Ejemplo 1: Rojo
    root.style.setProperty("--primary", "#ef4444");
    root.style.setProperty("--primary-foreground", "#ffffff");
    root.style.setProperty("--border", "#fca5a5");
    root.style.setProperty("--background", "#fef2f2");
    root.style.setProperty("--input", "#fca5a5");
    root.style.setProperty("--ring", "#ffffff");

    // Para cambiar, descomenta otro ejemplo:

    // Ejemplo 2: Azul
    // root.style.setProperty("--primary", "#3b82f6");
    // root.style.setProperty("--primary-foreground", "#ffffff");
    // root.style.setProperty("--border", "#bfdbfe");
    // root.style.setProperty("--background", "#eff6ff");

    // Ejemplo 3: Verde
    // root.style.setProperty("--primary", "#10b981");
    // root.style.setProperty("--primary-foreground", "#ffffff");
    // root.style.setProperty("--border", "#a7f3d0");
    // root.style.setProperty("--background", "#f0fdf4");

    // Ejemplo 4: Púrpura
    // root.style.setProperty("--primary", "#8b5cf6");
    // root.style.setProperty("--primary-foreground", "#ffffff");
    // root.style.setProperty("--border", "#ddd6fe");
    // root.style.setProperty("--background", "#faf5ff");
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
    },
  ];

  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
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
                <div key={field.name}>{renderFormField(field, form)}</div>
              ))}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
