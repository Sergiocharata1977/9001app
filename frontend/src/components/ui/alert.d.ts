import type React, { HTMLAttributes } from 'react';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

export declare const Alert: React.ForwardRefExoticComponent<React.PropsWithoutRef<AlertProps> & React.RefAttributes<any>>;
export declare const AlertTitle: React.ForwardRefExoticComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & React.RefAttributes<any>>;
export declare const AlertDescription: React.ForwardRefExoticComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & React.RefAttributes<any>>;

export {};
