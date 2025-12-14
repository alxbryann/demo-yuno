/** biome-ignore-all lint/suspicious/noArrayIndexKey: <x> */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscJson as VscJsonIcon } from "react-icons/vsc";
import { toast } from "sonner";
import type { z } from "zod";
import {
  generateDefaultValues,
  generateZodSchema,
} from "@/components/screens/generate-code-parts";
import { renderFormField } from "@/components/screens/render-form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import If from "@/components/ui/if";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FormLibrary } from "@/constants";
import type { FormFieldType } from "@/types";

export type FormFieldOrGroup = FormFieldType | FormFieldType[];

export type FormPreviewProps = {
  formFields: FormFieldOrGroup[];
  selectedLibrary: FormLibrary;
  onLibraryChange: (library: FormLibrary) => void;
  themeVars?: Record<string, string>;
};

const renderFormFields = (fields: FormFieldOrGroup[], form: any) => {
  return fields.map((fieldOrGroup, index) => {
    if (Array.isArray(fieldOrGroup)) {
      const getColSpan = (totalFields: number) => {
        switch (totalFields) {
          case 2:
            return 6;
          case 3:
            return 4;
          default:
            return 12;
        }
      };

      return (
        <div key={index} className="grid grid-cols-12 gap-4">
          {fieldOrGroup.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem
                  className={`col-span-${getColSpan(fieldOrGroup.length)}`}
                >
                  <FormControl>
                    {React.cloneElement(
                      renderFormField(field) as React.ReactElement,
                      { ...formField },
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      );
    }

    return (
      <FormField
        key={index}
        control={form.control}
        name={fieldOrGroup.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              {React.cloneElement(
                renderFormField(fieldOrGroup) as React.ReactElement,
                { ...formField },
              )}
            </FormControl>
          </FormItem>
        )}
      />
    );
  });
};

export const FormPreview: React.FC<FormPreviewProps> = ({ formFields, themeVars = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = generateZodSchema(formFields);
  const defaultVals = generateDefaultValues(formFields);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultVals,
  });

  // Apply theme variables to the preview container
  useEffect(() => {
    if (Object.keys(themeVars).length > 0) {
      const container = document.getElementById('form-preview-container');
      if (container) {
        Object.entries(themeVars).forEach(([key, value]) => {
          container.style.setProperty(key, value);
        });
      }
    }
  }, [themeVars]);

  function onSubmit(data: any) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white text-xs">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form");
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Preview</h2>
        <p className="text-sm text-muted-foreground">Live preview</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger value="json" className="gap-2">
            <VscJsonIcon className="h-4 w-4" />
            <span>JSON</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4 mt-4">
          <If
            condition={formFields.length > 0}
            render={() => (
              <div id="form-preview-container" style={themeVars as React.CSSProperties}>
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Preview Form</CardTitle>
                    <CardDescription>Test your form here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        {renderFormFields(formFields, form)}
                        <Button type="submit" className="w-full">
                          Submit
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            )}
            otherwise={() => (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                <p>No fields yet</p>
              </div>
            )}
          />
        </TabsContent>

        <TabsContent value="json" className="mt-4">
          <If
            condition={formFields.length > 0}
            render={() => {
              const fullConfig = {
                formFields,
                themeVars: themeVars || {},
              };
              return (
                <div className="bg-secondary rounded-lg p-4 max-h-[400px] overflow-auto">
                  <pre className="text-xs font-mono text-foreground">
                    {JSON.stringify(fullConfig, null, 2)}
                  </pre>
                </div>
              );
            }}
            otherwise={() => (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                <p>No fields yet</p>
              </div>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
