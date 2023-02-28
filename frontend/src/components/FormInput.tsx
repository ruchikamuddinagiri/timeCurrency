import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  labelText: string;
  inputName: string;
  inputType?: string;
  inputPlaceholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  labelText,
  inputName,
  inputType = 'text',
  inputPlaceholder = '',
}) => {
  const { register, formState: { errors } } = useFormContext();

  const renderErrorMessage = (error: any) => {
    return (
      error && (
        <span className='text-red-500 text-xs pt-1 block'>
          {error.message}
        </span>
      )
    );
  }

  return (
    <div className='my-3'>
      <label htmlFor={inputName} className='block text-gray-600 mb-1 font-medium'>
        {labelText}
      </label>
      <input 
        type={inputType}
        id={inputName}
        placeholder={inputPlaceholder}
        className='block w-full py-2 px-4 rounded-md bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent'
        {...register(inputName)}
      />
      {renderErrorMessage(errors[inputName])}
    </div>
  );
};

export default FormInput;
