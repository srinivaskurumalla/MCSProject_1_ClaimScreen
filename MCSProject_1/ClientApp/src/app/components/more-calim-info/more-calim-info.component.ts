import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-more-calim-info',
  templateUrl: './more-calim-info.component.html',
  styleUrls: ['./more-calim-info.component.css']
})
export class MoreCalimInfoComponent implements OnInit {

  @Input() claimId!: number;
  constructor(private _dbService: DbService) { }
  searchedClaim: any = {};

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes)

    if (changes.claimId) { // && !changes.claimId.firstChange
      const newClaimId = changes.claimId.currentValue;
      this.performSearch(newClaimId);
    }
  }
  performSearch(claimId: number) {
    if (this.searchedClaim.length !== 0) {
      this.searchedClaim = []
    }
    this._dbService.getSunClaimEntityRefById(claimId).subscribe(
      (res: any) => {
        this.searchedClaim.push(res);
        console.log(this.searchedClaim);

      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
