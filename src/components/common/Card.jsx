import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, shadows, radii } from '@/styles/theme';

const cardVariants = {
  default: css`
    background-color: ${colors.surface};
    border: 1px solid ${colors.border};
  `,
  highlighted: css`
    background-color: ${colors.surface};
    border: 1px solid ${colors.border};
    border-top: 4px solid ${colors.primary};
    transform: scale(1.05);
    box-shadow: ${shadows.lg};
    
    @media (max-width: 1024px) {
      transform: scale(1);
    }
  `,
  accent: css`
    background-color: ${colors.surface};
    border: 1px solid ${colors.border};
    border-top: 4px solid ${colors.accent};
  `,
  rose: css`
    background-color: ${colors.surface};
    border: 1px solid ${colors.border};
    border-top: 4px solid ${colors.secondary};
  `,
  testimonial: css`
    background-color: ${colors.surface};
    border-left: 4px solid ${colors.primary};
  `,
  value: css`
    background-color: rgba(99, 102, 241, 0.05);
    border: none;
  `,
};

const StyledCard = styled(motion.div)`
  border-radius: ${radii.md};
  padding: 32px;
  transition: all 0.3s ease;
  
  ${props => cardVariants[props.$variant || 'default']}
  
  ${props => props.$hoverable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${shadows.lg};
    }
  `}
`;

export default function Card({ 
  children, 
  variant = 'default',
  hoverable = false,
  ...props 
}) {
  return (
    <StyledCard
      $variant={variant}
      $hoverable={hoverable}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </StyledCard>
  );
}
