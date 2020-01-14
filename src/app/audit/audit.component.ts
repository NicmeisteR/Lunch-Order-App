import { Component, OnInit } from '@angular/core';
// Class imports
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';

interface res {
  Results: object
}

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})

export class AuditComponent implements OnInit {

  constructor(
    private githubService: GithubService,
  ){
    this.githubService.getRepos().subscribe((res: res) => {
      this.repoInfo = res;
    });
  }

  repoInfo;

  formatDate(date){
    let ts = new Date(date);
    return ts.toDateString()
  }

  ngOnInit() {
    console.log(this.repoInfo);
  }

}
