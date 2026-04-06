'use client';

import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, shadows, radii } from '@/styles/theme';

const buttonVariants = {
  primary: css`
    background-color: ${colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: #4F46E5;
      box-shadow: ${shadows.md};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    
    &:hover {
      background-color: rgba(99, 102, 241, 0.1);
    }
  `,
  accent: css`
    background-color: ${colors.accent};
    color: white;
    border: none;
    
    &:hover {
      background-color: #D97706;
      box-shadow: ${shadows.md};
    }
  `,
  rose: css`
    background-color: transparent;
    color: ${colors.secondary};
    border: 2px solid ${colors.secondary};
    
    &:hover {
      background-color: rgba(244, 63, 94, 0.1);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    
    &:hover {
      background-color: rgba(99, 102, 241, 0.1);
    }
  `,
};

const buttonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
    height: 36px;
  `,
  medium: css`
    padding: 12px 24px;
    font-size: 16px;
    height: 48px;
  `,
  large: css`
    padding: 16px 32px;
    font-size: 18px;
    height: 56px;
  `,
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${radii.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => buttonVariants[props.variant || 'primary']}
  ${props => buttonSizes[props.size || 'medium']}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
