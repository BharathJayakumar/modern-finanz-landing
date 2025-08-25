import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    'hero.headline': 'Smart Financial Planning for a Secure Future',
    'hero.subheadline': 'Download our free whitepaper and discover strategies for wealth building, retirement planning, and financial protection.',
    'hero.cta': 'Get Your Free Whitepaper',
    'hero.tagline': 'Die modernste Finanzkanzlei Deutschlands',
    
    // Value Proposition
    'value.headline': 'Why Choose Our Financial Expertise?',
    'value.subheadline': 'Get access to proven strategies from Germany\'s most modern financial advisory firm',
    'value.benefit1.title': 'Wealth Building Strategies',
    'value.benefit1.description': 'Tailored guidance for young professionals & self-employed individuals to maximize their financial potential.',
    'value.benefit2.title': 'Smart Retirement Planning',
    'value.benefit2.description': 'Expert insights on retirement planning, strategic investments, and wealth building techniques.',
    'value.benefit3.title': 'Insurance Insights',
    'value.benefit3.description': 'Learn about insurance strategies and risk management to protect your financial future.',
    'value.badge': 'Expertise from Germany\'s most modern financial advisory',
    
    // Form Section
    'form.headline': 'Download Your Free Whitepaper',
    'form.subheadline': 'Enter your details to receive the whitepaper and unlock exclusive financial insights.',
    'form.name.label': 'Full Name',
    'form.name.placeholder': 'John Doe',
    'form.email.label': 'Email Address',
    'form.email.placeholder': 'your.email@example.com',
    'form.mobile.label': 'Mobile Number',
    'form.mobile.placeholder': '+49 123 456 7890',
    'form.submit': 'Send Verification Code',
    'form.cta': 'Download Whitepaper',
    'form.submitting': 'Sending...',
    'form.privacy': 'Your data will be treated confidentially and will not be shared with third parties.',
    'form.verification.title': 'Verify Your Phone Number',
    'form.verification.description': 'We\'ve sent a 6-digit code to',
    'form.verification.code.label': 'Verification Code',
    'form.verification.code.placeholder': '123456',
    'form.verification.verify': 'Verify Code',
    'form.verification.verifying': 'Verifying...',
    'form.verification.back': '← Back to Form',
    'form.sms.sent.title': 'SMS Sent',
    'form.sms.sent.description': 'Please check your phone for the verification code.',
    'form.success.title': 'Phone Verified Successfully!',
    'form.success.description': 'Your number has been verified. You can now download the whitepaper.',
    'form.download.title': 'Download Started',
    'form.download.description': 'Your whitepaper download has begun.',
    'form.errors.title': 'Error',
    'form.errors.generic': 'Something went wrong. Please try again.',
    'form.errors.name': 'Please enter your full name',
    'form.errors.email': 'Please enter your email address',
    'form.errors.emailInvalid': 'Please enter a valid email address',
    'form.errors.phone': 'Please enter your mobile number',
    'form.errors.code': 'Please enter the verification code',
    'form.errors.codeInvalid': 'Invalid or expired verification code',
    
    // Trust Signals
    'trust.headline': 'Trust Our Expertise',
    'trust.testimonial1': 'Thanks to the modern approaches of this financial advisory firm, I was able to optimally structure my retirement planning and diversify my current investments.',
    'trust.testimonial1.author': 'Sarah M. - Self-employed Entrepreneur',
    'trust.testimonial2': 'This firm gave me the clarity I needed for my financial future. Now I feel much more confident about my financial decisions.',
    'trust.testimonial2.author': 'Michael K. - IT Specialist',
    'trust.customers': 'Over 5,000+ satisfied customers trust our modern financial advisory',
    
    // Footer
    'footer.headline': 'Die modernste Finanzkanzlei Deutschlands',
    'footer.description': 'Your partner for modern financial planning, wealth building and secure retirement planning.',
    'footer.copyright': '© 2024 Die modernste Finanzkanzlei Deutschlands. All rights reserved.',
    
    // Language Toggle
    'language.en': 'English',
    'language.de': 'Deutsch'
  },
  de: {
    // Hero Section
    'hero.headline': 'Clevere Finanzplanung für eine sichere Zukunft',
    'hero.subheadline': 'Laden Sie unser kostenloses Whitepaper herunter und entdecken Sie Strategien für Vermögensaufbau, Altersvorsorge und Absicherung.',
    'hero.cta': 'Kostenloses Whitepaper erhalten',
    'hero.tagline': 'Die modernste Finanzkanzlei Deutschlands',
    
    // Value Proposition
    'value.headline': 'Warum unsere Finanzexpertise wählen?',
    'value.subheadline': 'Erhalten Sie Zugang zu bewährten Strategien der modernsten Finanzkanzlei Deutschlands',
    'value.benefit1.title': 'Strategien zum Vermögensaufbau',
    'value.benefit1.description': 'Maßgeschneiderte Beratung für Young Professionals und Selbstständige zur Maximierung Ihres Finanzpotentials.',
    'value.benefit2.title': 'Clever planen für die Rente',
    'value.benefit2.description': 'Experteneinblicke in die Altersvorsorge, strategische Investitionen und Vermögensaufbau-Techniken.',
    'value.benefit3.title': 'Wichtige Tipps zur Absicherung',
    'value.benefit3.description': 'Lernen Sie Versicherungsstrategien und Risikomanagement zum Schutz Ihrer finanziellen Zukunft.',
    'value.badge': 'Expertise der modernsten Finanzkanzlei Deutschlands',
    
    // Form Section
    'form.headline': 'Laden Sie Ihr kostenloses Whitepaper herunter',
    'form.subheadline': 'Tragen Sie Ihre Daten ein, um das Whitepaper zu erhalten und exklusive Finanztipps freizuschalten.',
    'form.name.label': 'Vollständiger Name',
    'form.name.placeholder': 'Max Mustermann',
    'form.email.label': 'E-Mail-Adresse',
    'form.email.placeholder': 'ihre.email@beispiel.de',
    'form.mobile.label': 'Mobilnummer',
    'form.mobile.placeholder': '+49 123 456 7890',
    'form.submit': 'Bestätigungscode senden',
    'form.cta': 'Whitepaper herunterladen',
    'form.submitting': 'Wird gesendet...',
    'form.privacy': 'Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.',
    'form.verification.title': 'Telefonnummer bestätigen',
    'form.verification.description': 'Wir haben einen 6-stelligen Code gesendet an',
    'form.verification.code.label': 'Bestätigungscode',
    'form.verification.code.placeholder': '123456',
    'form.verification.verify': 'Code bestätigen',
    'form.verification.verifying': 'Bestätige...',
    'form.verification.back': '← Zurück zum Formular',
    'form.sms.sent.title': 'SMS versendet',
    'form.sms.sent.description': 'Bitte überprüfen Sie Ihr Telefon für den Bestätigungscode.',
    'form.success.title': 'Telefon erfolgreich bestätigt!',
    'form.success.description': 'Ihre Nummer wurde bestätigt. Sie können jetzt das Whitepaper herunterladen.',
    'form.download.title': 'Download gestartet',
    'form.download.description': 'Ihr Whitepaper-Download hat begonnen.',
    'form.errors.title': 'Fehler',
    'form.errors.generic': 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
    'form.errors.name': 'Bitte geben Sie Ihren vollständigen Namen ein',
    'form.errors.email': 'Bitte geben Sie Ihre E-Mail-Adresse ein',
    'form.errors.emailInvalid': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'form.errors.phone': 'Bitte geben Sie Ihre Mobilnummer ein',
    'form.errors.code': 'Bitte geben Sie den Bestätigungscode ein',
    'form.errors.codeInvalid': 'Ungültiger oder abgelaufener Bestätigungscode',
    
    // Trust Signals
    'trust.headline': 'Vertrauen Sie auf unsere Expertise',
    'trust.testimonial1': 'Dank der modernen Ansätze dieser Finanzkanzlei konnte ich meine Altersvorsorge optimal strukturieren und gleichzeitig meine aktuellen Investitionen diversifizieren.',
    'trust.testimonial1.author': 'Sarah M. - Selbstständige Unternehmerin',
    'trust.testimonial2': 'Diese Kanzlei hat mir die Klarheit für meine finanzielle Zukunft gegeben. Jetzt fühle ich mich viel sicherer bei meinen Finanzentscheidungen.',
    'trust.testimonial2.author': 'Michael K. - IT-Spezialist',
    'trust.customers': 'Über 5.000+ zufriedene Kunden vertrauen auf unsere moderne Finanzberatung',
    
    // Footer
    'footer.headline': 'Die modernste Finanzkanzlei Deutschlands',
    'footer.description': 'Ihr Partner für moderne Finanzplanung, Vermögensaufbau und sichere Altersvorsorge.',
    'footer.copyright': '© 2024 Die modernste Finanzkanzlei Deutschlands. Alle Rechte vorbehalten.',
    
    // Language Toggle
    'language.en': 'English',
    'language.de': 'Deutsch'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};