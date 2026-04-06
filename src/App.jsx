import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { colors, typography } from '@/styles/theme';

// Sections
import Hero from '@/components/sections/Hero';
import ProblemSolution from '@/components/sections/ProblemSolution';
import SponsorshipTiers from '@/components/sections/SponsorshipTiers';
import Mission from '@/components/sections/Mission';
import EmailCapture from '@/components/sections/EmailCapture';
import TrustProof from '@/components/sections/TrustProof';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

// Pages
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import RefundPolicy from '@/pages/RefundPolicy';
import SuccessPage from '@/pages/SuccessPage';
import CancelPage from '@/pages/CancelPage';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily};
    background-color: ${colors.background};
    color: ${colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background-color: rgba(99, 102, 241, 0.2);
    color: ${colors.text};
  }
`;

const Main = styled.main`
  min-height: 100vh;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <Main>
      <Hero />
      <ProblemSolution />
      <SponsorshipTiers />
      <Mission />
      <EmailCapture />
      <TrustProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </Main>
  );
}

export default App;
