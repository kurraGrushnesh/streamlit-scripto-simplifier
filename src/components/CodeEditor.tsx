
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Maximize, Moon, Share, Sun } from "lucide-react";
import LanguageSidebar from "./LanguageSidebar";
import CodeInputPanel from "./CodeInputPanel";
import OutputPanel from "./OutputPanel";

const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState("c");
  const [currentFileName, setCurrentFileName] = useState("main.c");
  const [swapped, setSwapped] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Initial sample code for C language
  const defaultCode = `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`;
  
  // Set default code on mount
  useState(() => {
    setCode(defaultCode);
  });

  const handleRun = () => {
    // In a real app, this would send code to a backend
    // For now, simulate execution
    setOutput(`Running ${currentFileName}...\n> Compiling...\n> Executing...\n> Output: Hello, World!`);
  };

  const handleClear = () => {
    setOutput("");
  };

  const handleSwap = () => {
    setSwapped(!swapped);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleShare = () => {
    // Simulate share functionality
    alert("Share link copied to clipboard!");
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    
    // Update filename based on language
    const extensions: Record<string, string> = {
      c: "c", cpp: "cpp", python: "py", javascript: "js", 
      php: "php", go: "go", java: "java", html: "html"
    };
    
    const extension = extensions[language] || "txt";
    setCurrentFileName(`main.${extension}`);
    
    // Set default code for the language
    const defaultCodes: Record<string, string> = {
      c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
      cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
      python: `# Python example\nprint("Hello, World!")`,
      javascript: `// JavaScript example\nconsole.log("Hello, World!");`,
      php: `<?php\n    echo "Hello, World!";\n?>`,
      go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
      java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
      html: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>`
    };
    
    setCode(defaultCodes[language] || "// Enter your code here");
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Language sidebar */}
      <LanguageSidebar 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <div className="px-3 py-1 text-sm font-medium border-b-2 border-blue-500">
              {currentFileName}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleThemeToggle}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {}}
              title="Fullscreen"
            >
              <Maximize size={18} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="flex items-center gap-1"
            >
              <Share size={16} /> Share
            </Button>
            
            <Button 
              onClick={handleRun}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Run
            </Button>
          </div>
        </div>
        
        {/* Editor and output */}
        <div className="flex flex-1 overflow-hidden">
          {/* Conditionally render the editor and output based on swapped state */}
          {swapped ? (
            <>
              <OutputPanel output={output} onClear={handleClear} />
              <div className="flex items-center justify-center px-1">
                <Button variant="ghost" size="icon" onClick={handleSwap} title="Swap panels">
                  <ArrowLeftRight size={16} />
                </Button>
              </div>
              <CodeInputPanel code={code} setCode={setCode} language={currentLanguage} />
            </>
          ) : (
            <>
              <CodeInputPanel code={code} setCode={setCode} language={currentLanguage} />
              <div className="flex items-center justify-center px-1">
                <Button variant="ghost" size="icon" onClick={handleSwap} title="Swap panels">
                  <ArrowLeftRight size={16} />
                </Button>
              </div>
              <OutputPanel output={output} onClear={handleClear} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
