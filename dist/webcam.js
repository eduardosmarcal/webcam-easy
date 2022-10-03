"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Webcam {
    /**
     * Webcam constructor.
     *
     * @param {HTMLVideoElement} videoElement
     * @param {FacingMode} [facingMode = "user"]
     * @param {HTMLCanvasElement} [canvasElement]
     * @param {HTMLAudioElement} [snapSoundElement]
     */
    constructor(videoElement, facingMode = "user", canvasElement, snapSoundElement) {
        this._webcamElement = videoElement;
        this._webcamElement.width = this._webcamElement.width || 640;
        this._webcamElement.height = this._webcamElement.height || this._webcamElement.width * (3 / 4);
        this._facingMode = facingMode;
        this._webcamList = [];
        this._streamList = [];
        this._selectedDeviceId = '';
        this._canvasElement = canvasElement;
        this._snapSoundElement = snapSoundElement;
    }
    /**
     * Get facing mode.
     *
     * @returns {FacingMode}
     */
    getFacingMode() {
        return this._facingMode;
    }
    /**
     * Set facing mode.
     *
     * @param {FacingMode} facingMode
     * @returns {void}
     */
    setFacingMode(facingMode) {
        this._facingMode = facingMode;
    }
    /**
     * Get webcam list.
     *
     * @returns {MediaDeviceInfo[]}
     */
    getWebcamList() {
        return this._webcamList;
    }
    /**
     * Get webcam count.
     *
     * @returns {number}
     */
    getWebcamCount() {
        return this._webcamList.length;
    }
    /**
     * Get selected device ID.
     *
     * @returns {string}
     */
    getSelectedDeviceId() {
        return this._selectedDeviceId;
    }
    /**
     * Get all video input devices info.
     *
     * @param {MediaDeviceInfo[]} mediaDevices
     * @returns {MediaDeviceInfo[]}
     */
    getVideoInputs(mediaDevices) {
        this._webcamList = [];
        mediaDevices.forEach((mediaDevice) => {
            if (mediaDevice.kind === "videoinput") {
                this._webcamList.push(mediaDevice);
            }
        });
        if (this._webcamList.length === 1) {
            this._facingMode = "user";
        }
        return this._webcamList;
    }
    /**
     * Get media constraints.
     *
     * @returns {MediaConstraints}
     */
    getMediaConstraints() {
        const videoConstraints = {};
        if (this._selectedDeviceId === '') {
            videoConstraints.facingMode = this._facingMode;
        }
        else {
            videoConstraints.deviceId = { exact: this._selectedDeviceId };
        }
        return {
            video: videoConstraints,
            audio: false
        };
    }
    /**
     * Select camera based on facing mode.
     *
     * @returns {void}
     */
    selectCamera() {
        for (let webcam of this._webcamList) {
            const label = webcam.label.toLowerCase();
            if ((this._facingMode === 'user' && label.includes('front'))
                || (this._facingMode === 'environment' && label.includes('back'))) {
                this._selectedDeviceId = webcam.deviceId;
                break;
            }
        }
    }
    /**
     * Change facing mode and selected camera.
     *
     * @returns {void}
     */
    flip() {
        this._facingMode = (this._facingMode === 'user') ? 'environment' : 'user';
        this._webcamElement.style.transform = "";
        this.selectCamera();
    }
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
    start(startStream = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.stop();
                navigator.mediaDevices.getUserMedia(this.getMediaConstraints()) // get permission from user
                    .then(stream => {
                    this._streamList.push(stream);
                    this.info() // get all video input devices info
                        .then(() => {
                        this.selectCamera(); // select camera based on facingMode
                        if (startStream) {
                            this.stream()
                                .then(() => resolve(this._facingMode))
                                .catch(error => reject(error));
                        }
                        else {
                            resolve(this._selectedDeviceId);
                        }
                    })
                        .catch(error => reject(error));
                })
                    .catch(error => reject(error));
            });
        });
    }
    /**
     * Get all video input devices info.
     *
     * @returns {Promise<MediaDeviceInfo[]>}
     */
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                    this.getVideoInputs(devices);
                    resolve(this._webcamList);
                })
                    .catch(error => reject(error));
            });
        });
    }
    /**
     * Start streaming webcam to video element.
     *
     * @returns {Promise<FacingMode>}
     */
    stream() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                navigator.mediaDevices.getUserMedia(this.getMediaConstraints())
                    .then(stream => {
                    this._streamList.push(stream);
                    this._webcamElement.srcObject = stream;
                    if (this._facingMode === 'user') {
                        this._webcamElement.style.transform = "scale(-1,1)";
                    }
                    this._webcamElement.play();
                    resolve(this._facingMode);
                })
                    .catch(error => reject(error));
            });
        });
    }
    /**
     * Stop streaming webcam.
     *
     * @returns {void}
     */
    stop() {
        this._streamList.forEach((stream) => {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
        });
    }
    /**
     * Snap.
     *
     * @throws {Error}
     * - An error is thrown if the Canvas element is missing.
     *
     * @returns {string}
     */
    snap() {
        var _a;
        const context = ((_a = this._canvasElement) === null || _a === void 0 ? void 0 : _a.getContext('2d')) || null;
        if (!(this._canvasElement && context)) {
            throw new Error('Canvas element is missing.');
        }
        if (this._snapSoundElement) {
            void this._snapSoundElement.play();
        }
        this._canvasElement.height = this._webcamElement.scrollHeight;
        this._canvasElement.width = this._webcamElement.scrollWidth;
        if (this._facingMode === 'user') {
            context.translate(this._canvasElement.width, 0);
            context.scale(-1, 1);
        }
        context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        context.drawImage(this._webcamElement, 0, 0, this._canvasElement.width, this._canvasElement.height);
        return this._canvasElement.toDataURL('image/png');
    }
}
exports.default = Webcam;
