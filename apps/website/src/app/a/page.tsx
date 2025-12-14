"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { Yuno } from "yuno-demo-sdk";
import { z } from "zod";
import { RenderFormField } from "@/components/screens/render-form-field";
import { ColorPickerFormDemo } from "@/components/theme-picker";
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

const STORAGE_KEY = "local-theme-config";

export default function CheckoutPage() {
  const [themeVars, setThemeVars] = useState<Record<string, string>>({});
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);

  const saveTheme = (newVars: Record<string, string>) => {
    setThemeVars(newVars);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setThemeVars(JSON.parse(saved));
    }

    // Listen for the Yuno SDK event
    const handleYunoFormReady = (event: CustomEvent) => {
      const { formFields: fields } = event.detail;
      if (Array.isArray(fields)) {
        setFormFields(fields);
      }
    };

    window.addEventListener(
      "yunoFormReady",
      handleYunoFormReady as EventListener,
    );

    // Initialize Yuno SDK
    // Yuno.render("yuno-checkout", "demo-public-key");

    return () => {
      window.removeEventListener(
        "yunoFormReady",
        handleYunoFormReady as EventListener,
      );
    };
  }, []);

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
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your payment</CardDescription>
          </CardHeader>
          <CardContent id="yuno-checkout">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
                className="space-y-4"
              >
                {formFields.map((field) => (
                  <RenderFormField key={field.name} field={field} />
                ))}
                <Button type="submit" className="w-full">
                  Pay Now
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
