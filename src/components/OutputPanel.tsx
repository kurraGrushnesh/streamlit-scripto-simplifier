
import { Button } from "@/components/ui/button";

interface OutputPanelProps {
  output: string;
  onClear: () => void;
}

const OutputPanel = ({ output, onClear }: OutputPanelProps) => {
  return (
    <div className="flex-1 border-l flex flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <h3 className="font-medium">Output</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
          className="text-sm"
        >
          Clear
        </Button>
      </div>
      
      <div className="flex-1 p-2 overflow-auto font-mono text-sm bg-white dark:bg-gray-900">
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default OutputPanel;
