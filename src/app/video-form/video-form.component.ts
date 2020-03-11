import { Component, OnInit } from '@angular/core';
import { Video } from '../model/video';
import { VideoService } from '../service/video.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
  video: Video = new Video();
  constructor(private videoService: VideoService) { }
  ngOnInit() {
  }
  validate(ch: string) {
    alert(ch);
  }
  add(description: string, link: string): void {
    this.video.videoDescription = description;
    if (link.includes("watch?v=")) {
      this.video.videoLink = link.replace("watch?v=", "embed/")
    } else {
      this.video.videoLink = link;
    }
    this.videoService.addVideo(this.video)
      .subscribe(v => console.log());
  }
}
