import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from '../services/users/SearchUsers.service';
import { SearchQueryDto } from '../services/external/SearchQueryDto';
import { NgForm } from '@angular/forms';
import { UserDto } from '../services/users/UserDto';
import { UsersService } from '../services/users/users.service';
import { DictionaryItemDto } from '../common/DictionaryItemDto';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.css']
})
export class UserFinderComponent implements OnInit {

  queryDto: SearchQueryDto;
  searchAttemp = false;
  searchResult: Array<UserDto>;

  interestDictionary: Array<DictionaryItemDto>;
  hairsDictionary: Array<DictionaryItemDto>;
  eyesDictionary: Array<DictionaryItemDto>;

  constructor(private searchService: SearchUsersService, private usersService: UsersService) {
    this.queryDto = new SearchQueryDto();
    this.searchResult = new Array<UserDto>();

    this.interestDictionary = new Array<DictionaryItemDto>();
    this.hairsDictionary = new Array<DictionaryItemDto>();
    this.eyesDictionary = new Array<DictionaryItemDto>();

    this.usersService.GetInterestsDictionary().subscribe(result => {
      this.interestDictionary = result;
    });

    this.usersService.GetHairColorsDictionary().subscribe(result => {
      this.hairsDictionary = result;
    });

    this.usersService.GetEyesColorsDictionary().subscribe(result => {
      this.eyesDictionary = result;
    });
  }

  ngOnInit() {
  }

  onSubmit(searchFormRef: NgForm) {
    this.queryDto.interestids = this.interestDictionary.filter(x => x.boolValue).map(x => x.id);
    this.searchService.FindUsers(this.queryDto).subscribe(ids => {
      this.usersService.GetManyUsers(ids).subscribe(usersDtos => {
        this.searchResult = usersDtos;
        this.searchAttemp = true;

        this.usersService.GetUsersAvatars(ids).subscribe(result => {
          this.searchResult.forEach(x => {
            const avatar = result.find(av => av.id === x.id);

            if (avatar !== null && avatar !== undefined && avatar.img !== undefined && avatar.img.length > 0){
              x.avatar = avatar.img;
            }
          });
        });

      });
    });
  }

}
