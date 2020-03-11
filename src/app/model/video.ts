import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export class Video {
    public safeURL: SafeResourceUrl;
    public videoLink: string;
    private videoDescription: string;
    private videoId?: Number;
    constructor(private _sanitizer: DomSanitizer) {
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.getVideoLink());
    }
    public setVideoLink(videoLink: string) {
        this.videoLink = videoLink;
    }
    public getVideoLink(): string {
        return this.videoLink;
    }
    public getSafeURL(): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.getVideoLink());
    }
    public setVideoDescription(videoDescription: string) {
        this.videoDescription = videoDescription;
    }
    public getVideoDescription(): string {
        return this.videoDescription;
    }
    public setVideoId(videoId: Number) {
        this.videoId = videoId;
    }
    public getVideoId(): Number {
        return this.videoId;
    }
}