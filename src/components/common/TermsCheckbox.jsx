import styled from 'styled-components';
import { colors, spacing, typography } from '@/styles/theme';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  margin: ${spacing.lg} 0;
  padding: ${spacing.md};
  background-color: #f9fafb;
  border-radius: 8px;
`;

const HiddenCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
  }

  &:checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }

  &:required:invalid {
    opacity: 1;
  }
`;

const Label = styled.label`
  flex: 1;
  font-size: 14px;
  color: ${colors.text};
  cursor: pointer;
  margin-top: 2px;
  line-height: 1.5;

  a {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: ${typography.weights.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function TermsCheckbox({ checked, onChange, disabled = false }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        id="terms-checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <Label htmlFor="terms-checkbox">
        I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>
      </Label>
    </CheckboxContainer>
  );
}
