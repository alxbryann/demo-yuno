import * as Locales from "date-fns/locale";

export type FormFieldType = {
  type: string;
  variant: string;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  disabled: boolean;
  value: string | boolean | Date | number | string[];
  setValue: (value: string | boolean) => void;
  checked: boolean;
  onChange: (
    value: string | string[] | boolean | Date | number | number[],
  ) => void;
  onSelect: (
    value: string | string[] | boolean | Date | number | number[],
  ) => void;
  rowIndex: number;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  locale?: keyof typeof Locales;
  hour12?: boolean;
  className?: string;
  styles?: {
    container?: string;
    label?: string;
    input?: string;
    button?: string;
    description?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      text?: string;
      border?: string;
      background?: string;
    };
  };
};

export type FieldType = { name: string; isNew: boolean; index?: number };

export interface EditorColumn {
  id: string;
  content: string;
  width: number;
}

export interface EditorBlock {
  id: string;
  type: "text" | "heading" | "checkbox" | "columns";
  content: string;
  columns?: EditorColumn[];
}

export interface EditorHistoryState {
  blocks: EditorBlock[];
  timestamp: number;
}
