export default function TextArea({text}) {
    return(
        <textarea id="app-textarea" className="app-font custom-scrollbar" value={text} disabled />
    );
}