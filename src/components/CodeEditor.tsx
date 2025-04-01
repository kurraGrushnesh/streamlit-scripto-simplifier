
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Maximize, Moon, Share, Sun, Play } from "lucide-react";
import LanguageSidebar from "./LanguageSidebar";
import CodeInputPanel from "./CodeInputPanel";
import OutputPanel from "./OutputPanel";
import { toast } from "sonner";

const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("c");
  const [currentFileName, setCurrentFileName] = useState("main.c");
  const [swapped, setSwapped] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Default code templates for different languages
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
  
  // Set default code on mount
  useEffect(() => {
    setCode(defaultCodes[currentLanguage]);
  }, [currentLanguage]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(`$ Running ${currentFileName}...\n`);
    
    // Simulate terminal execution with a realistic delay
    setTimeout(() => {
      const terminalCommands: Record<string, string[]> = {
        c: [`$ gcc ${currentFileName} -o main`, "$ ./main"],
        cpp: [`$ g++ ${currentFileName} -o main`, "$ ./main"],
        python: [`$ python3 ${currentFileName}`],
        javascript: [`$ node ${currentFileName}`],
        php: [`$ php ${currentFileName}`],
        go: [`$ go run ${currentFileName}`],
        java: [`$ javac ${currentFileName}`, "$ java Main"],
        html: [`$ open ${currentFileName}`]
      };
      
      // Show compilation/interpretation commands with delays
      const commands = terminalCommands[currentLanguage] || [];
      
      let currentStep = 0;
      const processSteps = () => {
        if (currentStep < commands.length) {
          setOutput(prev => prev + "\n" + commands[currentStep]);
          
          // Simulate command execution time
          setTimeout(() => {
            currentStep++;
            processSteps();
          }, 500);
        } else {
          // Final output
          setTimeout(() => {
            const outputs: Record<string, string> = {
              c: "Hello, World!",
              cpp: "Hello, World!",
              python: "Hello, World!",
              javascript: "Hello, World!",
              php: "Hello, World!",
              go: "Hello, World!",
              java: "Hello, World!",
              html: "[Browser opened with Hello, World!]"
            };
            
            setOutput(prev => prev + "\n\n" + (outputs[currentLanguage] || "Hello, World!"));
            setIsRunning(false);
            toast.success("Code execution completed!");
          }, 300);
        }
      };
      
      processSteps();
    }, 500);
  };

  const handleClear = () => {
    setOutput("");
    toast.info("Terminal cleared");
  };

  const handleSwap = () => {
    setSwapped(!swapped);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast.success(`Theme changed to ${theme === "light" ? "dark" : "light"} mode`);
  };

  const handleShare = () => {
    // Simulate share functionality
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Code copied to clipboard!");
    });
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
              disabled={isRunning}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
            >
              <Play size={16} /> {isRunning ? "Running..." : "Run"}
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
