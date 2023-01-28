const generateCode = async ({
  codeType,
    codeLanguage,
    codeDescription
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Write a ${codeType} 
          ${codeLanguage !== "Open API Spec" ? 
            `using the programming language ${codeLanguage}` 
            : 
            "That meets the following description of endpoints"} 
    
          ${codeDescription ? `That can meet the following requirements: ${codeDescription}.` : ""}. 
          Do not respond with anything more than code.
          Make sure the code has frequent high quality comments throughout to document the operations.`,
          max_tokens: 300,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { codeType, codeLanguage, codeDescription } = req.body;

  const answer = await generateCode({
    codeType,
    codeLanguage,
    codeDescription
  });

  res.status(200).json({
    answer,
  });
}
