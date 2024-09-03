import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import { useState, useRef } from 'react';
import 'draft-js/dist/Draft.css';

const TextEditor = (props) => {
    const [editorState, setEditorState] = useState(props.editorState || (() => EditorState.createEmpty()));
    const editor = useRef(null);

    const [editorData, setEditorData] = useState()

    const handleSend = () => {
        props.sendToParent(editorData);
    }

    function focusEditor() {
        editor.current.focus();
    }



    const StyleButton = (props) => {

        let onClickButton = (e) => {
            e.preventDefault();
            props.onToggle(props.style);
        }

        return (
            <span onMouseDown={onClickButton} className='ion-margin' style={{ fontSize: "18px", fontWeight: "bold" }}>
                {props.label}
            </span>
        )
    }


    const Block_Types = [
        { label: 'قائمة غير مرتبة', style: 'unordered-list-item' },
        { label: 'قائمة مرتبة', style: 'ordered-list-item' },
    ]

    const BlockStyleControls = (props) => {
        return (
            <div>
                {Block_Types.map(type => {
                    return (
                        <StyleButton
                            key={type.label}
                            label={type.label}
                            style={type.style}
                            onToggle={props.onToggle}
                        />
                    )
                })}
            </div>
        )
    }

    const onBlockClick = (e) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    }


    // setEditorData(JSON.stringify(convertToRaw(editorState.getCurrentContent())))

    return (
        <div className='RichEditor-root' onClick={focusEditor} style={{ border: '1px solid #ccc', minHeight: '100px', minWidth: '100%', padding: '10px' }}>
            <div className='RichEditor-controls'>
                <BlockStyleControls
                    onToggle={onBlockClick}
                />
            </div>

            <div className='RichEditor-editor'>
                <Editor
                    onClick={focusEditor}
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => {
                        setEditorState(editorState);
                        setEditorData(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
                        handleSend();
                    }}
                />
            </div>

        </div>
    );
};

export default TextEditor;