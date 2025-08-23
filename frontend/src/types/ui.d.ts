// Tipos para componentes UI

import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

// Declaraciones para manejar imports con diferentes casings
declare module '@/components/ui/button' {
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    loading?: boolean;
    children: ReactNode;
  }
  export const Button: React.FC<ButtonProps>;
}

declare module '@/components/ui/Button' {
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    loading?: boolean;
    children: ReactNode;
  }
  export const Button: React.FC<ButtonProps>;
}

declare module '@/components/ui/input' {
  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }
  export const Input: React.FC<InputProps>;
}

declare module '@/components/ui/Input' {
  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }
  export const Input: React.FC<InputProps>;
}

declare module '@/components/ui/card' {
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    variant?: 'default' | 'outlined' | 'elevated';
  }
  export const Card: React.FC<CardProps>;
  export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>>;
  export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Card' {
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    variant?: 'default' | 'outlined' | 'elevated';
  }
  export const Card: React.FC<CardProps>;
  export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>>;
  export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/badge' {
  export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children: ReactNode;
  }
  export const Badge: React.FC<BadgeProps>;
}

declare module '@/components/ui/Badge' {
  export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children: ReactNode;
  }
  export const Badge: React.FC<BadgeProps>;
}

declare module '@/components/ui/progress' {
  export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
  }
  export const Progress: React.FC<ProgressProps>;
}

declare module '@/components/ui/Progress' {
  export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
  }
  export const Progress: React.FC<ProgressProps>;
}

// Tipos para Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Tipos para Table
export interface TableProps<T = any> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pagination?: PaginationProps;
  onRowClick?: (row: T) => void;
}

export interface ColumnDef<T = any> {
  key: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
  width?: string | number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// Tipos para Form
export interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
}

// Tipos para Loading
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'spinner' | 'dots' | 'skeleton';
}

// Tipos para Alert
export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  action?: ReactNode;
}

// Tipos para Tooltip
export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// Tipos para Dropdown
export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
}

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

// Tipos para Tabs
export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

// Tipos para Accordion
export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

// Tipos para DataTable
export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  pagination?: DataTablePagination;
  sorting?: DataTableSorting;
  filtering?: DataTableFiltering;
  onRowSelect?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
}

export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTablePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface DataTableSorting {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

export interface DataTableFiltering {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
  filterOptions?: Record<string, { value: string; label: string }[]>;
}

// Declaraciones para componentes UI faltantes

declare module '@/components/ui/alert' {
  export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'success';
    children?: ReactNode;
  }
  
  export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
  export const AlertTitle: React.ForwardRefExoticComponent<AlertTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const AlertDescription: React.ForwardRefExoticComponent<AlertDescriptionProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Alert' {
  export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'success';
    children?: ReactNode;
  }
  
  export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
  export const AlertTitle: React.ForwardRefExoticComponent<AlertTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const AlertDescription: React.ForwardRefExoticComponent<AlertDescriptionProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/separator' {
  export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    children?: ReactNode;
  }
  
  export const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Separator' {
  export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    children?: ReactNode;
  }
  
  export const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/avatar' {
  export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AvatarImageProps extends HTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    children?: ReactNode;
  }
  
  export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
  export const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
  export const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Avatar' {
  export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AvatarImageProps extends HTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    children?: ReactNode;
  }
  
  export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
  export const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
  export const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/skeleton' {
  export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
  }
  
  export interface PersonalCardSkeletonProps {
    cards?: number;
  }
  
  export const Skeleton: React.MemoExoticComponent<React.FC<SkeletonProps>>;
  export const PersonalCardSkeleton: React.MemoExoticComponent<React.FC<PersonalCardSkeletonProps>>;
}

declare module '@/components/ui/Skeleton' {
  export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
  }
  
  export interface PersonalCardSkeletonProps {
    cards?: number;
  }
  
  export const Skeleton: React.MemoExoticComponent<React.FC<SkeletonProps>>;
  export const PersonalCardSkeleton: React.MemoExoticComponent<React.FC<PersonalCardSkeletonProps>>;
}

declare module '@/components/ui/textarea' {
  export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    children?: ReactNode;
  }
  
  export const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
}

declare module '@/components/ui/Textarea' {
  export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    children?: ReactNode;
  }
  
  export const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
}

declare module '@/components/ui/select' {
  export interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    position?: 'popper' | 'item-aligned';
  }
  
  export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
  }
  
  export const Select: React.FC<SelectProps>;
  export const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
  export const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
  export const SelectValue: React.ForwardRefExoticComponent<SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
}

declare module '@/components/ui/Select' {
  export interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  export interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    position?: 'popper' | 'item-aligned';
  }
  
  export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: ReactNode;
    disabled?: boolean;
  }
  
  export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
  }
  
  export const Select: React.FC<SelectProps>;
  export const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
  export const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
  export const SelectValue: React.ForwardRefExoticComponent<SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
}

declare module '@/components/ui/label' {
  export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    children?: ReactNode;
  }
  
  export const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
}

declare module '@/components/ui/Label' {
  export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    children?: ReactNode;
  }
  
  export const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
}

declare module '@/components/ui/table' {
  export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children?: ReactNode;
  }
  
  export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
  }
  
  export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
  }
  
  export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children?: ReactNode;
  }
  
  export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
  }
  
  export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
  }
  
  export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
    children?: ReactNode;
  }
  
  export const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
  export const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
  export const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
  export const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
  export const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
  export const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
  export const TableCaption: React.ForwardRefExoticComponent<TableCaptionProps & React.RefAttributes<HTMLTableCaptionElement>>;
}

declare module '@/components/ui/Table' {
  export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children?: ReactNode;
  }
  
  export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
  }
  
  export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
  }
  
  export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children?: ReactNode;
  }
  
  export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
  }
  
  export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
  }
  
  export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
    children?: ReactNode;
  }
  
  export const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
  export const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
  export const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
  export const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
  export const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
  export const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
  export const TableCaption: React.ForwardRefExoticComponent<TableCaptionProps & React.RefAttributes<HTMLTableCaptionElement>>;
}

declare module '@/components/ui/checkbox' {
  export interface CheckboxProps extends HTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    value?: string;
    name?: string;
    children?: ReactNode;
  }
  
  export const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/Checkbox' {
  export interface CheckboxProps extends HTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    value?: string;
    name?: string;
    children?: ReactNode;
  }
  
  export const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/use-toast' {
  export interface Toast {
    id: string;
    title?: string;
    description?: string;
    action?: ReactNode;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
  }
  
  export interface UseToastReturn {
    toast: (props: Omit<Toast, 'id'>) => string;
    dismiss: (toastId?: string) => void;
    toasts: Toast[];
  }
  
  export function useToast(): UseToastReturn;
}

declare module '@/components/ui/tooltip' {
  export interface TooltipProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  }
  
  export interface TooltipTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface TooltipProviderProps {
    children?: ReactNode;
    delayDuration?: number;
  }
  
  export const Tooltip: React.FC<TooltipProps>;
  export const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
  export const TooltipProvider: React.FC<TooltipProviderProps>;
}

declare module '@/components/ui/Tooltip' {
  export interface TooltipProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  }
  
  export interface TooltipTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface TooltipProviderProps {
    children?: ReactNode;
    delayDuration?: number;
  }
  
  export const Tooltip: React.FC<TooltipProps>;
  export const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  export const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
  export const TooltipProvider: React.FC<TooltipProviderProps>;
}

declare module '@/components/ui/alert-dialog' {
  export interface AlertDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogActionProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogCancelProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export const AlertDialog: React.FC<AlertDialogProps>;
  export const AlertDialogTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const AlertDialogContent: React.ForwardRefExoticComponent<AlertDialogContentProps & React.RefAttributes<HTMLDivElement>>;
  export const AlertDialogHeader: React.FC<AlertDialogHeaderProps>;
  export const AlertDialogTitle: React.ForwardRefExoticComponent<AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const AlertDialogDescription: React.ForwardRefExoticComponent<AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const AlertDialogFooter: React.FC<AlertDialogFooterProps>;
  export const AlertDialogAction: React.ForwardRefExoticComponent<AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>>;
  export const AlertDialogCancel: React.ForwardRefExoticComponent<AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/AlertDialog' {
  export interface AlertDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
  }
  
  export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogActionProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export interface AlertDialogCancelProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
  }
  
  export const AlertDialog: React.FC<AlertDialogProps>;
  export const AlertDialogTrigger: React.ForwardRefExoticComponent<HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
  export const AlertDialogContent: React.ForwardRefExoticComponent<AlertDialogContentProps & React.RefAttributes<HTMLDivElement>>;
  export const AlertDialogHeader: React.FC<AlertDialogHeaderProps>;
  export const AlertDialogTitle: React.ForwardRefExoticComponent<AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  export const AlertDialogDescription: React.ForwardRefExoticComponent<AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
  export const AlertDialogFooter: React.FC<AlertDialogFooterProps>;
  export const AlertDialogAction: React.ForwardRefExoticComponent<AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>>;
  export const AlertDialogCancel: React.ForwardRefExoticComponent<AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>>;
}

export { };

