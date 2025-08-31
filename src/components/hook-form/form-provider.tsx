import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  invisible?: boolean;
};

export function Form({ children, onSubmit, methods, invisible }: FormProps) {
  return (
    <RHFForm {...methods}>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        style={invisible ? { display: 'contents' } : undefined}
      >
        {children}
      </form>
    </RHFForm>
  );
}
