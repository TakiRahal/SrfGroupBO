import React from 'react';
// import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false
});

export function CustomSunEditor({ defaultValue, callbcakHandleChange }: { defaultValue: string, callbcakHandleChange: any }) {

    const handleChange = (content: any) => {
        callbcakHandleChange(content);
    }

    React.useEffect(() => {
        console.log('defaultValue ', defaultValue);
    }, [defaultValue])

    return (
        <SunEditor lang="en"
           defaultValue={defaultValue || ''}
           setOptions={{
               height: '200',
               buttonList: [
                   ['undo', 'redo', 'font', 'fontSize', 'formatBlock']
               ]
           }}
           onChange={handleChange}/>
    );
}
