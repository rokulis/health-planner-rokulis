import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const FloatingLabelInput: React.FC<Props> = ({ label, id, ...rest }) => {
  return (
    <div className="relative w-full">
      <input
        {...rest}
        id={id}
        className="block rounded-md border border-transparent focus:border-primary px-2.5 h-14 pb-2.5 pt-5 w-full text-sm bg-gray/50 text-black appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/3 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};
