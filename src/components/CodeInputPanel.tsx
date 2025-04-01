
import { useEffect, useRef } from "react";

interface CodeInputPanelProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const CodeInputPanel = ({ code, setCode, language }: CodeInputPanelProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle line numbers and textarea sync
  useEffect(() => {
    if (textareaRef.current) {
      const lineCount = code.split("\n").length;
      const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
      document.getElementById("line-numbers")!.innerText = lineNumbers;
    }
  }, [code]);

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Line numbers */}
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 p-2 text-right select-none w-12 overflow-y-hidden">
        <pre id="line-numbers" className="font-mono text-xs">1</pre>
      </div>
      
      {/* Code editor */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-2 font-mono text-sm resize-none outline-none bg-white dark:bg-gray-900 dark:text-gray-100"
          spellCheck="false"
          wrap="off"
        />
      </div>
    </div>
  );
};

export default CodeInputPanel;
