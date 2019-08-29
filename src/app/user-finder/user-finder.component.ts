import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from '../services/users/SearchUsers.service';
import { SearchQueryDto } from '../services/external/SearchQueryDto';
import { NgForm } from '@angular/forms';
import { UserDto } from '../services/users/UserDto';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.css']
})
export class UserFinderComponent implements OnInit {

  queryDto: SearchQueryDto;
  searchAttemp: boolean = false;
  searchResult: Array<UserDto>;

  constructor(private searchService: SearchUsersService) {
    this.queryDto = new SearchQueryDto();
    this.searchResult = new Array<UserDto>();
  }

  ngOnInit() {
  }

  onSubmit(searchFormRef: NgForm) {
    this.searchService.findStaticQueryIds(this.queryDto).subscribe(ids =>{
      this.searchService.GetUsers(ids).subscribe(usersDtos => {
        this.searchResult = usersDtos;
        this.searchAttemp = true;
      });
    });
  }

}
