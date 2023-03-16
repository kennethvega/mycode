
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";

// load all highlight.js languages`

import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
  FaRedo,
  FaUndo,
  FaCode,
} from "react-icons/fa";
import { BiCodeCurly } from "react-icons/bi";
const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote()}
          className="blockquote"
          type="button"
        ></button>
        <button
          type="button"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          title="Strike through"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </button>
        <button
          type="button"
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </button>
        <button
          type="button"
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          h3
        </button>
        <button
          type="button"
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          title="Ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          title="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <BiCodeCurly />
        </button>
      </div>
      <div>
        <button
          type="button"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          type="button"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

type TextEditorProps = {
  bodyContent: string;
  setBodyContent: (html: string) => void;
};

const TextEditor = ({ setBodyContent, bodyContent }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],

    content: `${bodyContent ? `${bodyContent}` : ""}
    
    `,
    editable: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setBodyContent(html);
    },
  });

  return (
    <div className="text-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} spellCheck="false" />
    </div>
  );
};

export default TextEditor;
