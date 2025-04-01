
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSidebarProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSidebar = ({ currentLanguage, onLanguageChange }: LanguageSidebarProps) => {
  const languages = [
    { id: "c", label: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { id: "cpp", label: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { id: "python", label: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { id: "javascript", label: "JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { id: "go", label: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    { id: "php", label: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
    { id: "java", label: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { id: "html", label: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
  ];

  return (
    <div className="w-12 border-r flex flex-col items-center py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      {languages.map((lang) => (
        <Button
          key={lang.id}
          variant="ghost"
          size="icon"
          className={cn(
            "w-10 h-10 mb-1 rounded-md",
            currentLanguage === lang.id 
              ? "bg-blue-100 dark:bg-blue-900" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          onClick={() => onLanguageChange(lang.id)}
          title={lang.label}
        >
          {lang.icon ? (
            <img src={lang.icon} alt={lang.label} className="w-6 h-6" />
          ) : (
            <span>{lang.label}</span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSidebar;
