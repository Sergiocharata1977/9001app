// Ambient declarations for UI modules to satisfy TypeScript in TS files
// Note: Keeping this file import-free so declarations are global

declare module '@/components/ui/alert' {
  export const Alert: any;
  export const AlertTitle: any;
  export const AlertDescription: any;
}

declare module '@/components/ui/separator' {
  export const Separator: any;
}

declare module '@/components/ui/avatar' {
  export const Avatar: any;
  export const AvatarImage: any;
  export const AvatarFallback: any;
}

declare module '@/components/ui/skeleton' {
  export const Skeleton: any;
  export const PersonalCardSkeleton: any;
  export const DepartamentoCardSkeleton: any;
  export const PuestoCardSkeleton: any;
  export const TableSkeleton: any;
  export const CardSkeleton: any;
  export const FormSkeleton: any;
  export const ListSkeleton: any;
  export const HeaderSkeleton: any;
  export const StatsSkeleton: any;
  export const ModalSkeleton: any;
  export const PersonalSingleSkeleton: any;
  export const PersonalListSkeleton: any;
  export const HallazgosListSkeleton: any;
  export const DocumentosListSkeleton: any;
  export const HallazgoFormSkeleton: any;
  export const DocumentoFormSkeleton: any;
}