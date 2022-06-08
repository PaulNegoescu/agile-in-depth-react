import { useState } from 'react';

export function useFormInput(fields, validation) {
  const [values, setValues] = useState(fields);
  const [errors, setErrors] = useState(() => {
    const newObj = {};
    for (const field in fields) {
      newObj[field] = '';
    }
    return newObj;
  });

  function handleInputChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    validateField(field, value);
    setValues({ ...values, [field]: value });
  }

  function getProps(name) {
    return {
      values,
      name,
      onChange: handleInputChange,
    };
  }

  const newErrors = { ...errors };
  function validateField(field, value) {
    let allPassed = true;
    for (const rule of validation[field]) {
      const isValid = rule.isValid(value);
      newErrors[field] = isValid ? '' : rule.message;

      if (!isValid) {
        allPassed = false;
      }
    }
    setErrors(newErrors);

    return allPassed;
  }

  function isFormValid() {
    let allValid = true;
    for (const field in values) {
      const isValid = validateField(field, values[field]);
      if (!isValid) {
        allValid = false;
      }
    }

    return allValid;
  }

  return { values, errors, handleInputChange, getProps, isFormValid };
}
