const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateQuip = async (req, res) => {
  try {
    const { statDescription } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Make a short funny quip about: ${statDescription}`,
      max_tokens: 50,
      temperature: 0.7,
    });

    const quip = response.data.choices[0].text.trim();
    return res.json({ quip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
};
