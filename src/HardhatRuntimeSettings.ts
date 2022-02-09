export interface HardhatRuntimeSettings {
  [key: string]: any;
}

export interface HardhatUserSettings {
  default?: HardhatRuntimeSettings;
  [key: string]: HardhatRuntimeSettings | undefined;
}

export interface HardhatSettings {
  [key: string]: HardhatRuntimeSettings;
}
