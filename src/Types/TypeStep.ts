declare global {
  type TypeStep = {
    index: number;
    isValid: boolean;
    username?: string;
    inputs: {
      [inputId: string]: TypeInput;
    };
  };
}

export {};
