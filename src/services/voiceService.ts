export class VoiceService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  private isSupported: boolean;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.isSupported = 'speechSynthesis' in window && !!SpeechRecognition;

    if (this.isSupported && SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }

    this.synthesis = window.speechSynthesis;
  }

  isVoiceSupported(): boolean {
    return this.isSupported;
  }

  startListening(
    onResult: (transcript: string) => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError('Speech recognition not supported');
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error || 'Recognition error');
    };

    this.recognition.start();
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) return;

    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }
}

export const voiceService = new VoiceService();
