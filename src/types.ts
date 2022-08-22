export type FacingMode = "environment" | "user";

export interface DeviceId {
  exact: string;
}

export interface VideoConstraints {
  facingMode?: FacingMode;
  deviceId?: DeviceId;
}

export interface MediaConstraints {
  video: VideoConstraints;
  audio: boolean;
}
