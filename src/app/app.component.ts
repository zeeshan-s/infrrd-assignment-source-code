import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './core/loading-spinner/loading-spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  meetingRooms: Array<any> = [{
    name:"Meeting Room 1",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 2",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 3",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 4",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 5",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },{
    name:"Meeting Room 6",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 7",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 8",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 9",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  },
  {
    name:"Meeting Room 10",
    bookings:[],
    contentCollapsed: false,
    status: "Available"
  }];
  showAllertMessage: string = "";
  bookingRequest:any = {
    date: null,
    time:{
      from: null,
      to:null
    },
    agenda: "",
    userName:"",
  }
  selectedRoom:any = {};
  toggleModel: boolean = false;
  bookingError: string = "";
  constructor(private loader: LoadingSpinnerService){

  }
  ngOnInit(){
    
    this.checkRoomStatus()
  }
  checkRoomStatus(){
    
    let currentDate = this.formatDate(new Date());
    let minutes: any = new Date().getMinutes();
    minutes = minutes.toString().length == 1 ? `0${minutes}`: minutes
    let timeNow = `${new Date().getHours()}:${minutes}`;

    this.bookingError = "";
    if(this.bookingRequest.date){
      let requestedDate = new Date(this.bookingRequest.date);
      if(requestedDate.getDay() == 6 || requestedDate.getDay() == 0){
        this.bookingError = "Bookings available only on weekdays"
      }else if(this.parseTime(this.bookingRequest.time.from) < 900 || this.parseTime(this.bookingRequest.time.to) > 1800){
        this.bookingError = "Time Range must be bitween 9:00 AM - 6:00 PM"
      }else if(this.parseTime(this.bookingRequest.time.to) - this.parseTime(this.bookingRequest.time.from) < 30){
        this.bookingError = "Meeting duration must be more thane 30 Min"
      }else{
        this.loader.show();
        this.meetingRooms.forEach(element => {
          if(element.bookings.length){
            element.bookings.forEach(booking => {
              if(booking.date == currentDate && this.roomAvailablity(timeNow, booking.time.from, booking.time.to)){
                element.status = "In-Use"
              }else if(this.bookingRequest.date && this.bookingRequest.date == booking.date && this.isRoomBooked(booking)){

                element.status = "Booked"
              }else{
                element.status = "Available"
              }
            });
          }else{
            element.status = "Available"
          }
        });
        setTimeout(() => {
          this.loader.hide();
          
        }, 1000);
      }
      
    }
    
  }
  isRoomBooked(booking){
    let booked = false;
    if(booking.date == this.bookingRequest.date)

      if(this.parseTime(this.bookingRequest.time.from) <= this.parseTime(booking.time.from)){

        if(this.parseTime(this.bookingRequest.time.to) < this.parseTime(booking.time.from)){

          if(this.parseTime(this.bookingRequest.time.to) < this.parseTime(booking.time.from)){
            //booked = true;
          }
        }else if(this.parseTime(this.bookingRequest.time.from) <= this.parseTime(booking.time.from)){
          booked = true;
        }
          
      }
    else{
      booked = false;
    }
    return booked
  }

  parseTime(time){
    if(time){
      return parseInt(time.split(':').join(''))
    }
    
  }

  roomAvailablity(time, from, to){
    let fromTime = parseInt(from.split(':').join(""));
    let toTime = parseInt(to.split(':').join(""));
    let selectedTime = parseInt(time.split(':').join(""));
    if(fromTime <= selectedTime && toTime > selectedTime){
      return true
    }else{
      return false;
    }
  }
  searchRooms(){
    this.checkRoomStatus();

  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  confirmBooking(room){
    this.selectedRoom = room; 
    this.toggleModel = true
  }
  bookRoom(){
    this.bookingError = "";
    if(this.bookingRequest.date){
      this.checkRoomStatus();
      this.meetingRooms.forEach(element => {
        if(element.name == this.selectedRoom.name){
          if(element.status == "Available"){
            element.bookings.push(this.bookingRequest);
            this.bookingRequest = {
              date: null,
              time:{
                from: null,
                to:null
              },
              agenda: "",
              userName:""
            }
            
            this.showAllertMessage = "Meeting Room Booked Successfully";
            this.toggleModel = false;
            setTimeout(() => {
              this.showAllertMessage = "";
            }, 2000);
          }else{
            this.bookingError = "This room is not avaliable for selected schedule"
          }
          
        }
      });
    }
  }
  deleteBooking(roomIndex, bookingIndex){
    this.meetingRooms[roomIndex].bookings.splice(bookingIndex, 1);
  }
}
