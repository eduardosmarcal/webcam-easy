import { FacingMode, MediaConstraints } from "./types";
export default class Webcam {
    private readonly _webcamElement;
    private readonly _canvasElement?;
    private readonly _snapSoundElement?;
    private _facingMode;
    private _webcamList;
    private _streamList;
    private _selectedDeviceId;
    /**
     * Webcam constructor.
     *
     * @param {HTMLVideoElement} videoElement
     * @param {FacingMode} [facingMode = "user"]
     * @param {HTMLCanvasElement} [canvasElement]
     * @param {HTMLAudioElement} [snapSoundElement]
     */
    constructor(videoElement: HTMLVideoElement, facingMode?: FacingMode, canvasElement?: HTMLCanvasElement, snapSoundElement?: HTMLAudioElement);
    /**
     * Get facing mode.
     *
     * @returns {FacingMode}
     */
    getFacingMode(): FacingMode;
    /**
     * Set facing mode.
     *
     * @param {FacingMode} facingMode
     * @returns {void}
     */
    setFacingMode(facingMode: FacingMode): void;
    /**
     * Get webcam list.
     *
     * @returns {MediaDeviceInfo[]}
     */
    getWebcamList(): MediaDeviceInfo[];
    /**
     * Get webcam count.
     *
     * @returns {number}
     */
    getWebcamCount(): number;
    /**
     * Get selected device ID.
     *
     * @returns {string}
     */
    getSelectedDeviceId(): string;
    /**
     * Get all video input devices info.
     *
     * @param {MediaDeviceInfo[]} mediaDevices
     * @returns {MediaDeviceInfo[]}
     */
    getVideoInputs(mediaDevices: MediaDeviceInfo[]): MediaDeviceInfo[];
    /**
     * Get media constraints.
     *
     * @returns {MediaConstraints}
     */
    getMediaConstraints(): MediaConstraints;
    /**
     * Select camera based on facing mode.
     *
     * @returns {void}
     */
    selectCamera(): void;
    /**
     * Change facing mode and selected camera.
     *
     * @returns {void}
     */
    flip(): void;
    /**
     * Start.
     *
     *  1. Get permission from user
     *  2. Get all video input devices info
     *  3. Select camera based on facingMode
     *  4. Start stream
     *
     * @param {boolean} [startStream = true]
     * @returns {Promise<string>}
     */
    start(startStream?: boolean): Promise<string>;
    /**
     * Get all video input devices info.
     *
     * @returns {Promise<MediaDeviceInfo[]>}
     */
    info(): Promise<MediaDeviceInfo[]>;
    /**
     * Start streaming webcam to video element.
     *
     * @returns {Promise<FacingMode>}
     */
    stream(): Promise<FacingMode>;
    /**
     * Stop streaming webcam.
     *
     * @returns {void}
     */
    stop(): void;
    /**
     * Snap.
     *
     * @throws {Error}
     * - An error is thrown if the Canvas element is missing.
     *
     * @returns {string}
     */
    snap(): string;
}
//# sourceMappingURL=webcam.d.ts.map