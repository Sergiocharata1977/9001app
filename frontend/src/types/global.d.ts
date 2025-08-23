// Tipos globales para el proyecto ISO 9001 APP

import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

declare module '*.jsx' {
  const content: any;
  export default content;
}

declare module '*.js' {
  const content: any;
  export default content;
}

declare module '@/components/ui/*' {
  const component: React.ComponentType<any>;
  export default component;
}

declare module '@/hooks/*' {
  const hook: any;
  export default hook;
}

declare module '@/services/*' {
  const service: any;
  export default service;
}

// Tipos globales para APIs
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para filtros comunes
interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Tipos para estados comunes
type EstadoComun = 'activo' | 'inactivo' | 'pendiente' | 'completado' | 'cancelado';

// Tipos para fechas
type DateString = string; // Formato ISO 8601
type DateTimeString = string; // Formato ISO 8601 con tiempo

// Tipos para IDs
type ID = string | number;

// Tipos para formularios
interface FormErrors {
  [key: string]: string;
}

interface FormState<T = any> {
  data: T;
  errors: FormErrors;
  isValid: boolean;
  isSubmitting: boolean;
}

// Tipos para notificaciones
interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Tipos para permisos
type Permission = string;
type Role = 'admin' | 'user' | 'moderator' | 'viewer';

// Tipos para archivos
interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: DateString;
}

// Tipos para auditoría
interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  userName: string;
  timestamp: DateString;
  details?: any;
}

// Tipos para configuración
interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
  environment: 'development' | 'production' | 'staging';
}

// Declaraciones globales
declare global {
  interface Window {
    __APP_CONFIG__: AppConfig;
  }
}

export {};

// ========== DECLARACIONES DE MÓDULOS UI ==========

// Alert Component Declarations
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

// Separator Component Declarations
declare module '@/components/ui/separator' {
  export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    children?: ReactNode;
  }
  
  export const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
}

// Avatar Component Declarations
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

// Skeleton Component Declarations
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

// Additional UI Components with alternative casing
declare module '@/components/ui/Alert' {
  export * from '@/components/ui/alert';
}

declare module '@/components/ui/Separator' {
  export * from '@/components/ui/separator';
}

declare module '@/components/ui/Avatar' {
  export * from '@/components/ui/avatar';
}

declare module '@/components/ui/Skeleton' {
  export * from '@/components/ui/skeleton';
}

// Additional common UI components
declare module '@/components/ui/button' {
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    loading?: boolean;
    children?: ReactNode;
  }
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/Button' {
  export * from '@/components/ui/button';
}

declare module '@/components/ui/card' {
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
  }
  export const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
  export const CardHeader: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  export const CardTitle: React.ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
  export const CardContent: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
  export const CardFooter: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/Card' {
  export * from '@/components/ui/card';
}

declare module '@/components/ui/badge' {
  export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children?: ReactNode;
  }
  export const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
}

declare module '@/components/ui/Badge' {
  export * from '@/components/ui/badge';
}

declare module '@/components/ui/input' {
  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
  }
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
}

declare module '@/components/ui/Input' {
  export * from '@/components/ui/input';
}

declare module '@/components/ui/label' {
  export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    children?: ReactNode;
  }
  export const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
}

declare module '@/components/ui/Label' {
  export * from '@/components/ui/label';
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
  export * from '@/components/ui/select';
}
