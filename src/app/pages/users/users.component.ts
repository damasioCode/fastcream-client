import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { SideBarComponent } from '../../layout/side-bar/side-bar.component';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-users",
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent implements OnInit {
  public usersList: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  public getUsersList() {
    this.usersService.getUsersList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.usersList = response;
      },
      error: (error) => {},
      complete: () => {
        console.log("terminou a request");
      },
    });
  }
}
