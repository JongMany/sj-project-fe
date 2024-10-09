import { useCallback, useState } from 'react';

export const useForm = <T>(initialValues: T) => {
  const [form, setForm] = useState<T>(initialValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const reset = useCallback(() => setForm(initialValues), [initialValues]);

  return { form, onChange, reset };
};
