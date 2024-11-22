import React from "react";
import "./Input.css";

export type InputProps = {
  label: {
    show: boolean;
    text: string;
  };
  type: "text" | "textarea" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week";
  validation?: (value: string) => string | null;
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  metaData: {
    placeholder?: string;
    error?: string;
    name: string;
    value?: string
  }
};

//write docstring here
/**
 * 
 * @param label - Object containing show and text
 * @param type - Type of input field
 * @param validation - Function to validate input field
 * @param onChange - Function to handle input field change
 * @param metaData - Object containing placeholder, error and name
 * @returns 
 */

const Input = ({
  label,
  type = "text",
  validation,
  onChange,
  metaData,
}: InputProps) => {
  return (
    <div className="input__Container">
      {label.show && <label>{label.text}</label>}
      {type === "textarea" ? (
        <textarea className={`input`}
          name={metaData?.name}
          value={metaData.value}
          onChange={onChange}
          placeholder={metaData?.placeholder}
          rows={10} />)
        :
        <input
          className={`input`} // Apply class based on input type
          type={type}
          name={metaData?.name}
          onChange={onChange}
          value={metaData.value}
          placeholder={metaData?.placeholder}
        />}
      {metaData?.error && <span className="text-red-500">{metaData.error}</span>}
    </div>
  );
};

export default Input;
