
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = () => {
  const [code, setCode] = useState(""); // Store code content here
 const [language, setLanguage] = useState("javascript"); // Default language

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
 

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
    <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>

    <div className="mb-4">
      <label htmlFor="language" className="block font-semibold mb-2">
        Select Language:
      </label>
      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="kotlin">Kotlin</option> 
      </select>
    </div>
 

    <label htmlFor="code" className="block font-semibold mb-2">
      Code:
    </label>
    <MonacoEditor
      width="100%"
      height="300"
      language={language}
      theme="vs-light"
      value={code}
      onChange={handleCodeChange}
      options={{
        wordWrap: "on",
      }}
    />
  </div>
  );
};

export default CodeEditor;
