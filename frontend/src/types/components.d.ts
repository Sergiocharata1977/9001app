// Tipos y declaraciones genéricas para componentes UI sin tipos dedicados
import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Fallback genérico para cualquier import bajo '@/components/ui/*'
declare module '@/components/ui/*' {
  const Component: React.ComponentType<any>;
  export default Component;
}

// Dialog (shadcn/radix style)
declare module '@/components/ui/dialog' {
  export const Dialog: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }>;
  export const DialogTrigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const DialogContent: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const DialogHeader: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const DialogTitle: React.FC<HTMLAttributes<HTMLHeadingElement>>;
  export const DialogDescription: React.FC<HTMLAttributes<HTMLParagraphElement>>;
}

// Select
declare module '@/components/ui/select' {
  export const Select: React.FC<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void }>;
  export const SelectTrigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const SelectValue: React.FC<{ placeholder?: string }>;
  export const SelectContent: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const SelectItem: React.FC<{ value: string } & HTMLAttributes<HTMLDivElement>>;
}

// Table
declare module '@/components/ui/table' {
  export const Table: React.FC<HTMLAttributes<HTMLTableElement>>;
  export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>>;
  export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>>;
  export const TableRow: React.FC<HTMLAttributes<HTMLTableRowElement>>;
  export const TableHead: React.FC<HTMLAttributes<HTMLTableCellElement>>;
  export const TableCell: React.FC<HTMLAttributes<HTMLTableCellElement>>;
}

// Label
declare module '@/components/ui/label' {
  export const Label: React.FC<HTMLAttributes<HTMLLabelElement>>;
}

// Textarea
declare module '@/components/ui/textarea' {
  export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {}
  export const Textarea: React.FC<TextareaProps>;
}

// Dropdown Menu
declare module '@/components/ui/dropdown-menu' {
  export const DropdownMenu: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }>;
  export const DropdownMenuTrigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const DropdownMenuContent: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const DropdownMenuLabel: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const DropdownMenuSeparator: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const DropdownMenuItem: React.FC<HTMLAttributes<HTMLDivElement>>;
}

// Tabs
declare module '@/components/ui/tabs' {
  export const Tabs: React.FC<{ defaultValue?: string; value?: string; onValueChange?: (value: string) => void }>;
  export const TabsList: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.FC<{ value: string } & HTMLAttributes<HTMLButtonElement>>;
  export const TabsContent: React.FC<{ value: string } & HTMLAttributes<HTMLDivElement>>;
}

// Toast / Toaster
declare module '@/components/ui/toast' {
  export const ToastProvider: React.FC<{}>;
  export const ToastViewport: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const Toast: React.FC<{ variant?: 'default' | 'destructive' } & HTMLAttributes<HTMLDivElement>>;
  export const ToastTitle: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const ToastDescription: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const ToastAction: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const ToastClose: React.FC<HTMLAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/toaster' {
  export const Toaster: React.FC<{}>;
}

// Tooltip
declare module '@/components/ui/tooltip' {
  export const TooltipProvider: React.FC<{}>;
  export const Tooltip: React.FC<{ delayDuration?: number }>;
  export const TooltipTrigger: React.FC<HTMLAttributes<HTMLElement>>;
  export const TooltipContent: React.FC<HTMLAttributes<HTMLDivElement>>;
}

// Calendar
declare module '@/components/ui/calendar' {
  export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
    mode?: any;
    selected?: Date | Date[] | null;
    onSelect?: (date: Date | undefined) => void;
    initialFocus?: boolean;
  }
  const Calendar: React.FC<CalendarProps>;
  export default Calendar;
}

// Checkbox
declare module '@/components/ui/checkbox' {
  export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
  export const Checkbox: React.FC<CheckboxProps>;
}

// Collapsible
declare module '@/components/ui/collapsible' {
  export const Collapsible: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }>;
  export const CollapsibleTrigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const CollapsibleContent: React.FC<HTMLAttributes<HTMLDivElement>>;
}

// Popover
declare module '@/components/ui/popover' {
  export const Popover: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }>;
  export const PopoverTrigger: React.FC<HTMLAttributes<HTMLButtonElement>>;
  export const PopoverContent: React.FC<HTMLAttributes<HTMLDivElement>>;
}

// Radio group
declare module '@/components/ui/radio-group' {
  export const RadioGroup: React.FC<{ value?: string; onValueChange?: (value: string) => void }>;
  export const RadioGroupItem: React.FC<{ value: string } & HTMLAttributes<HTMLInputElement>>;
}

// Scroll area
declare module '@/components/ui/scroll-area' {
  export const ScrollArea: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const ScrollBar: React.FC<HTMLAttributes<HTMLDivElement>>;
}