import Link from "next/link";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import If from "@/components/ui/if";
import { fieldTypes } from "@/constants";

type FieldSelectorProps = {
  addFormField: (variant: string, index?: number) => void;
};

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  addFormField,
}) => {
  return (
    <div className="flex md:flex-col items-start h-screen flex-wrap md:flex-nowrap gap-3 overflow-y-auto">
      {fieldTypes.map((variant) => (
        <div className="flex items-center gap-1" key={variant.name}>
          <Button
            key={variant.name}
            variant="outline"
            onClick={() => addFormField(variant.name, variant.index)}
            className="rounded-full"
            size="sm"
          >
            {variant.name}
            <If
              condition={variant.isNew}
              render={() => (
                <Badge
                  variant={"outline"}
                  className="md:hidden ml-1 p-1 text-[10px]"
                >
                  New
                </Badge>
              )}
            />
          </Button>
          <If
            condition={variant.isNew}
            render={() => (
              <Badge
                variant={"outline"}
                className="hidden md:block ml-1 p-1 text-[10px]"
              >
                New
              </Badge>
            )}
          />
        </div>
      ))}
    </div>
  );
};
