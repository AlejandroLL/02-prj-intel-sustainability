// Ask-the-guide feature:
// 1) Read user question from the form
// 2) Send question to OpenAI
// 3) Show status + response in the UI

const OPENAI_CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const FALLBACK_MODEL = 'gpt-4.1-mini';
const GUIDE_SYSTEM_PROMPT =
  'You are a friendly museum guide in an Intel history exhibit. Explain Intel history and sustainability milestones in clear, simple language for beginner students. Stay focused on Intel-related topics.';

const aiForm = document.getElementById('ai-form');
const questionInput = document.getElementById('user-question');
const askButton = document.getElementById('ask-button');
const aiStatus = document.getElementById('ai-status');
const aiAnswer = document.getElementById('ai-answer');

// Uses values from secrets.js.
const modelName = window.OPENAI_MODEL || FALLBACK_MODEL;

function getApiKey() {
  // Supports both styles in secrets.js:
  // const OPENAI_API_KEY = '...'
  // window.OPENAI_API_KEY = '...'
  if (typeof OPENAI_API_KEY !== 'undefined') {
    return String(OPENAI_API_KEY).trim();
  }

  return String(window.OPENAI_API_KEY || '').trim();
}

function hasValidApiKey() {
  // Basic client-side check so users get fast feedback.
  const key = getApiKey();
  if (!key) return false;
  if (key === 'PASTE_YOUR_OPENAI_KEY_HERE') return false;
  return key.startsWith('sk-');
}

function setLoadingState(isLoading) {
  // Lock the button while request is in progress.
  askButton.disabled = isLoading;
  askButton.textContent = isLoading ? 'Asking the Guide...' : 'Ask the Guide';
}

function showError(message) {
  // Centralized UI error display.
  aiStatus.textContent = 'Something went wrong.';
  aiAnswer.textContent = message;
}

if (!hasValidApiKey()) {
  aiStatus.textContent = 'OpenAI key missing. Add OPENAI_API_KEY in secrets.js.';
}

aiForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userQuestion = questionInput.value.trim();

  if (!userQuestion) {
    aiStatus.textContent = 'Please type a question first.';
    aiAnswer.textContent = '';
    return;
  }

  if (!hasValidApiKey()) {
    showError('No API key found. Open secrets.js and add your key.');
    return;
  }

  setLoadingState(true);
  aiStatus.textContent = 'The guide is reviewing the Intel archives...';
  aiAnswer.textContent = '';

  try {
    const apiKey = getApiKey();

    // Send question to OpenAI.
    const response = await fetch(OPENAI_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: GUIDE_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userQuestion
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      let errorMessage = `OpenAI request failed (${response.status}).`;

      try {
        const errorData = await response.json();
        if (errorData && errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        }
      } catch (parseError) {
        // Keep the default error message when JSON parsing fails.
      }

      if (response.status === 401) {
        errorMessage = 'Invalid API key. Check OPENAI_API_KEY in secrets.js.';
      }

      if (response.status === 429) {
        errorMessage = 'Rate limit reached. Please wait a moment and try again.';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    // Read the assistant text from the first returned choice.
    const answer = data.choices?.[0]?.message?.content?.trim() || 'No answer returned.';

    aiStatus.textContent = 'Your museum guide is ready with an answer.';
    aiAnswer.textContent = answer;
  } catch (error) {
    showError(error.message);
  } finally {
    setLoadingState(false);
  }
});
