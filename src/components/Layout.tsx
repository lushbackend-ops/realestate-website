import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onOpenBrochure?: () => void;
  onOpenPrivacy: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenBrochure, onOpenPrivacy }) => {
  return (
    <>
      <Navigation onOpenBrochure={onOpenBrochure} />
      <main id="main-content">{children}</main>
      <Footer onOpenPrivacy={onOpenPrivacy} />
    </>
  );
};

export default Layout;
