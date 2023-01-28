import React, { useState } from "react";

export default function Dashboard() {
  const [answer, setAnswer] = useState("");

  const [codeType, setCodeType] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [codeDescription, setCodeDescription] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(completedCode);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnPompii", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeType,
        codeLanguage,
        codeDescription
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="flex flex-col">
              <p>Write me a </p>
              <label className="sr-only" htmlFor="codeType">
                Code Type
              </label>
              <select
                value={codeType}
                onChange={(e) => setCodeType(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="codeType"
                id="codeType"
              >
                <option value="codeType">What type of code? </option>
                <option value="function">Function</option>
                <option value="component">React Component</option>
                <option value="component">React Native Component</option>
                <option value="component">Nextjs Component</option>
                <option value="react hook">React Hook</option>
                <option value="redux action">Redux Action</option>
                <option value="api endpoint">Node API Endpoint</option>
                <option value="Handlebars Template">Handlebars Template</option>
                <option value="Handlebars Partial">Handlebars Partial</option>
                <option value="Open API Spec">Open API Spec</option>
                <option value="Smart Contract">Smart Contract</option>
                <option value="User Interface">UI Element</option>
              </select>
            </div>

            <div className="flex flex-col">
              <p>that can </p>
              <label htmlFor="codeDescription" className="sr-only">
                Code Description
              </label>
              <textarea
                rows={7}
                value={codeDescription}
                onChange={(e) => setCodeDescription(e.target.value)}
                name="codeDescription"
                id="codeDescription"
                placeholder="Code Description"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${isGenerating
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Code"}
            </button>

          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                completedCode === ""
                  ? 7
                  : 100
              }
              name="output"
              value={completedCode}
              onChange={(e) => completedCode(e.target.value)}
              disabled={completedCode === ""}
              id="output"
              placeholder="AI Generated Code"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={completedCode === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
