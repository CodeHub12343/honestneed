'use client';

import styled from 'styled-components';
import { colors, radii } from '@/styles/theme';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${colors.border};
  border-radius: ${radii.sm};
  background-color: ${colors.surface};
  color: ${colors.text};
  transition: all 0.15s ease;
  
  &::placeholder {
    color: ${colors.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &:disabled {
    background-color: ${colors.background};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: 14px;
  color: ${colors.error};
`;

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  name,
  ...props
}) {
  return (
    <InputWrapper>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span style={{ color: colors.error }}> *</span>}
        </Label>
      )}
      <StyledInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
}
