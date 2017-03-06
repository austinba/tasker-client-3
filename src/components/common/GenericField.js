import React from 'react';
const GenericField = (onChange, onBlur) =>
  ({name, placeholder, type, className, fields, autoFocus}) => {
    const {value, pristine, error} = fields[name];
    return (
      <span>
        <input name={name}
               placeholder={placeholder}
               value={value || ''}
               onChange={onChange}
               onBlur={onBlur}
               autoFocus={autoFocus}
               type={type || 'text'} className={className} />
        {!pristine && error}
      </span>
)};
export default GenericField;
