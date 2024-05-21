"use client"
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

type Props = {
    content: JSONContent;
}

function ProductDescription({content}: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        editable: false,
        content: content,
        editorProps: {
            attributes: {
                class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base "
            }
        },
    });

    if(!editor) {
        return null;
    }

  return (
    <>
        <EditorContent editor={editor} />
    </>
  )
}

export default ProductDescription