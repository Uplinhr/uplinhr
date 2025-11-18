// Utilidad centralizada para Text-to-Speech
export const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancela cualquier speech en curso
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;

    // Función para seleccionar la voz preferida
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      // Buscar la voz "Microsoft Valentina Online (Natural) - Spanish (Uruguay)"
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Valentina') ||
        voice.name.includes('Microsoft Valentina Online (Natural)')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        // Fallback: usar cualquier voz en español
        const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        if (spanishVoice) {
          utterance.voice = spanishVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    };

    // Las voces pueden no estar disponibles inmediatamente
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
  } else {
    console.warn('Text-to-speech no está disponible en este navegador');
  }
};
