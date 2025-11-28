import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hausa', name: 'Hausa', flag: '🇳🇬' },
    { code: 'igbo', name: 'Igbo', flag: '🇳🇬' },
    { code: 'yoruba', name: 'Yoruba', flag: '🇳🇬' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button className="language-switcher flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors border border-gray-300 rounded-lg hover:border-green-400 bg-white">
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span className="transform transition-transform group-hover:rotate-180">▼</span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            className={`w-full text-left px-4 py-3 transition-colors flex items-center space-x-3 ${
              i18n.language === language.code 
                ? 'bg-green-100 text-green-800 font-semibold' 
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            } first:rounded-t-lg last:rounded-b-lg`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;