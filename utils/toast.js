export const showToast = (text, setMessage, duration = 2000) => {
  console.log('🔔 Toast:', text);
  setMessage(text);
  setTimeout(() => {
    setMessage('');
  }, duration);
};