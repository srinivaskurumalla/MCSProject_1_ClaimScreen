import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-more-calim-info',
  templateUrl: './more-calim-info.component.html',
  styleUrls: ['./more-calim-info.component.css']
})

export class MoreCalimInfoComponent implements OnInit {

  displayedColumns = [
    'name',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  dataSource = ELEMENT_DATA;

  @Input() claimId!: number;
  constructor(private _dbService: DbService) { }
  searchedClaim: any = [];
  showMoreClaimDetails: boolean = false;

  currentDay = new Date();
  ngOnInit() {

    //this.performSearch(this.claimId);
  }
  showMoreClaimDetail() {
    this.showMoreClaimDetails = !this.showMoreClaimDetails
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes)

    if (changes.claimId ) { // && !changes.claimId.firstChange
      const newClaimId = changes.claimId.currentValue;
      this.performSearch(newClaimId);
    }
  }
  performSearch(claimId: number) {
    if (this.searchedClaim.length !== 0) {
      this.searchedClaim = []
    }
    debugger
    this._dbService.getSunClaimEntityRefById(claimId).subscribe(

      (res: any) => {
        if (res != null) {
          this.searchedClaim.push(res);
          console.log(this.searchedClaim);

      }

      },
      (err: any) => {
        console.log(err);
      }
    );

  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
