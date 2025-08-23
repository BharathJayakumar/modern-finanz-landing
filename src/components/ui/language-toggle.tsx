import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 backdrop-blur-sm">
      <Button
        variant={language === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-8 px-3 text-sm font-medium rounded-full"
      >
        {t('language.en')}
      </Button>
      <Button
        variant={language === 'de' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('de')}
        className="h-8 px-3 text-sm font-medium rounded-full"
      >
        {t('language.de')}
      </Button>
    </div>
  );
};