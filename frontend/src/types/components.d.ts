// Declaraciones de tipos para componentes adicionales

import { HTMLAttributes, ReactNode, ComponentPropsWithoutRef, ElementRef } from 'react';

// Declaraciones para componentes de UI adicionales

declare module '@/components/ui/dialog' {
  export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Dialog: React.FC<DialogProps>;
  export const DialogTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
  export const DialogHeader: React.FC<DialogHeaderProps>;
  export const DialogTitle: React.ForwardRefExoticComponent<DialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const DialogDescription: React.ForwardRefExoticComponent<DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const DialogFooter: React.FC<DialogFooterProps>;
}

declare module '@/components/ui/Dialog' {
  export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Dialog: React.FC<DialogProps>;
  export const DialogTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
  export const DialogHeader: React.FC<DialogHeaderProps>;
  export const DialogTitle: React.ForwardRefExoticComponent<DialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const DialogDescription: React.ForwardRefExoticComponent<DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const DialogFooter: React.FC<DialogFooterProps>;
}

declare module '@/components/ui/dropdown-menu' {
  export interface DropdownMenuProps {
    children?: ReactNode;
  }
  
  export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
  
  export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
  
  export const DropdownMenu: React.FC<DropdownMenuProps>;
  export const DropdownMenuTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuSeparator: React.ForwardRefExoticComponent<DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/DropdownMenu' {
  export interface DropdownMenuProps {
    children?: ReactNode;
  }
  
  export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
  
  export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
  
  export const DropdownMenu: React.FC<DropdownMenuProps>;
  export const DropdownMenuTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
  export const DropdownMenuSeparator: React.ForwardRefExoticComponent<DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/toast' {
  export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'success';
    children?: ReactNode;
  }
  
  export interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface ToastActionProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    altText?: string;
  }
  
  export const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
  export const ToastTitle: React.ForwardRefExoticComponent<ToastTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const ToastDescription: React.ForwardRefExoticComponent<ToastDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const ToastAction: React.ForwardRefExoticComponent<ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/Toast' {
  export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'success';
    children?: ReactNode;
  }
  
  export interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface ToastActionProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    altText?: string;
  }
  
  export const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
  export const ToastTitle: React.ForwardRefExoticComponent<ToastTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const ToastDescription: React.ForwardRefExoticComponent<ToastDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const ToastAction: React.ForwardRefExoticComponent<ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/tabs' {
  export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    children?: ReactNode;
  }
  
  export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
  }
  
  export const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
  export const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Tabs' {
  export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    children?: ReactNode;
  }
  
  export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
  }
  
  export const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
  export const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/popover' {
  export interface PopoverProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
  
  export const Popover: React.FC<PopoverProps>;
  export const PopoverTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Popover' {
  export interface PopoverProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
  
  export const Popover: React.FC<PopoverProps>;
  export const PopoverTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/accordion' {
  export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'single' | 'multiple';
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
    children?: ReactNode;
  }
  
  export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
  }
  
  export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
  export const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
  export const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const AccordionContent: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Accordion' {
  export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'single' | 'multiple';
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
    children?: ReactNode;
  }
  
  export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
  }
  
  export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
  export const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
  export const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const AccordionContent: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/calendar' {
  export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
    mode?: 'single' | 'multiple' | 'range';
    selected?: Date | Date[] | { from: Date; to: Date };
    onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
    disabled?: boolean | ((date: Date) => boolean);
    children?: ReactNode;
  }
  
  export const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Calendar' {
  export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
    mode?: 'single' | 'multiple' | 'range';
    selected?: Date | Date[] | { from: Date; to: Date };
    onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
    disabled?: boolean | ((date: Date) => boolean);
    children?: ReactNode;
  }
  
  export const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/collapsible' {
  export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Collapsible: React.ForwardRefExoticComponent<CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
  export const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const CollapsibleContent: React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Collapsible' {
  export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Collapsible: React.ForwardRefExoticComponent<CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
  export const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const CollapsibleContent: React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/radio-group' {
  export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface RadioGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
  export const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/RadioGroup' {
  export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface RadioGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
  export const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/scroll-area' {
  export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }
  
  export const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/ScrollArea' {
  export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
  }
  
  export const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
}

export { };