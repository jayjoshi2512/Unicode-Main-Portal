import { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading3,
  List,
  ListOrdered,
  Eraser,
  Code,
  Eye,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write description here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isHtmlMode]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      const html = editorRef.current.innerHTML;
      onChange(html === "<p><br></p>" || html === "<br>" ? "" : html);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      handleInput();
    }
  };

  return (
    <div className="border border-border rounded-sm bg-white overflow-hidden shadow-xs">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-surface border-b border-border text-ink">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => executeCommand("bold")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => executeCommand("italic")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onClick={() => executeCommand("underline")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <Underline size={15} />
          </button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <button
            type="button"
            title="Heading 3"
            onClick={() => executeCommand("formatBlock", "<h3>")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            title="Bullet List"
            onClick={() => executeCommand("insertUnorderedList")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => executeCommand("insertOrderedList")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <ListOrdered size={15} />
          </button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <button
            type="button"
            title="Clear Formatting"
            onClick={() => executeCommand("removeFormat")}
            disabled={isHtmlMode}
            className="p-1.5 rounded-sm hover:bg-gray-200 text-ink/80 hover:text-ink disabled:opacity-40 transition-colors"
          >
            <Eraser size={15} />
          </button>
        </div>

        {/* View Toggle */}
        <button
          type="button"
          onClick={() => setIsHtmlMode(!isHtmlMode)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-semibold text-muted hover:text-brand bg-white border border-border"
        >
          {isHtmlMode ? (
            <>
              <Eye size={13} /> Visual View
            </>
          ) : (
            <>
              <Code size={13} /> Edit HTML
            </>
          )}
        </button>
      </div>

      {/* Editor Content Area */}
      {isHtmlMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter raw HTML here..."
          className="w-full p-3 font-mono text-xs text-ink bg-gray-50 min-h-[140px] focus:outline-none resize-y"
          rows={6}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          className="p-3.5 min-h-[140px] max-h-[300px] overflow-y-auto text-sm text-ink focus:outline-none prose prose-sm max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted/60"
        />
      )}
    </div>
  );
}
