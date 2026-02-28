import React,{useEffect,useRef} from 'react'
import Codemirror from "codemirror"
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
const Editor = ({socketRef}) => {
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
           editorRef.current=Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            )
 editorRef.current.on('change', (instance, changes) => { //?part of codemirror
                const { origin } = changes; //!destructuring the changes object to get the origin which tells us how the change was made for example +input means the change was made by the user typing something or cut which means the change was made by the user remving /deleting code
                const code = instance.getValue();//getting the typed cpde from the editor
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, { //socketRef here is not present in the file so we pass it as a child component from the editorpage file //**also this code change is listened in the server.js file
                        roomId,
                        code,
                    });
                }
            });
        }
      init()
    },[]);


    useEffect(() => {
        if (socketRef.current) { //code to be set into the database (wmitted from the server)
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }
    },[]);
  return <textarea id="realtimeEditor"></textarea>
}

export default Editor
