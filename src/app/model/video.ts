import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export class Video {
    private _sanitizer: DomSanitizer;
    public videoLink: string;
    public videoDescription: string;
    public safeURL: SafeResourceUrl = (this.videoLink == null) ? "" : this._sanitizer.bypassSecurityTrustResourceUrl(this.videoLink);
    public videoId?: number;
    constructor() {
        
    }
}    
