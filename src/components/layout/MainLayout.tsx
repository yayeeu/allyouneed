import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
