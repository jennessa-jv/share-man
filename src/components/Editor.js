import React,{useEffect,useRef} from 'react'
import Codemirror from "codemirror"
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
const Editor = () => {
    const editorRef = useRef(null);
    //  const [language, setLanguage] = useState("javascript");

  const languageModes = {
    javascript: "javascript",
    python: "python",
    java: "text/x-java",
    cpp: "text/x-c++src",
  };
//   useEffect(() => {
//     if (!editorRef.current) {
//       editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
//         mode: languageModes[language],
//         theme: "dracula",
//         lineNumbers: true,
//       });
//     } else {
//       editorRef.current.setOption("mode", languageModes[language]);
//     }
//   }, [language]);
    useEffect(()=>{
      async function init() {
           Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            )

        }
      init()
    },[]);
return <textarea id="realtimeEditor"></textarea>
}

export default Editor
