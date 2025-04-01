
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface OutputPanelProps {
  output: string;
  onClear: () => void;
}

const OutputPanel = ({ output, onClear }: OutputPanelProps) => {
  return (
    <div className="flex-1 border-l flex flex-col">
      <div className="flex items-center justify-between border-b px-2 py-1">
        <h3 className="font-medium text-sm">Terminal</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
          className="text-xs h-7 px-2 flex items-center gap-1"
        >
          <Trash2 size={14} /> Clear
        </Button>
      </div>
      
      <div className="flex-1 p-2 overflow-auto font-mono text-sm bg-black text-green-400">
        {output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="opacity-50 italic">Terminal ready...</div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
