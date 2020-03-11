import { Component, OnInit } from '@angular/core';
import { VideoService} from '../service/video.service';
import { takeUntil } from 'rxjs/operators';
import { Video } from '../model/video';
import { from, Subject } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})

export class VideosComponent implements OnInit {
  safeURL: SafeResourceUrl;
  videos: Video[];
    destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private videoService: VideoService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoService.getVideos().pipe(takeUntil(this.destroy$)).subscribe((shit: Video[]) => {
      console.log();
      this.videos = shit;
      this.videos.forEach((turd) => {
        turd.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(turd.videoLink);
        console.log();
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }

  delete(video: Video):void {
    this.videos = this.videos.filter(v => v!== video);
    this.videoService.deleteVideo(video).subscribe();
  }
}