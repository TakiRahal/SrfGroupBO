import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './EditorConvertToHTML.scss';

interface MyProps {
    callBackParent: any,
    placeholder: string
}

interface MyState {
    editorState: any
}

export default class EditorConvertToHTML extends Component <MyProps, MyState>{

    constructor (props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onEditorStateChange = (editorState: any) => {
        this.setState({
            editorState,
        });
        this.props.callBackParent(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
    };

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="custom-wrapper-container"
                    editorClassName="custom-editor-container"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={this.props.placeholder}
                />

            </div>
        );
    }
}