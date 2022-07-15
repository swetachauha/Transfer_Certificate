import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder , FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TCTableComponent } from '../tctable/tctable.component';

@Component({
  selector: 'app-search-tc',
  templateUrl: './search-tc.component.html',
  styleUrls: ['./search-tc.component.css']
})
export class SearchTCComponent implements OnInit {

  @ViewChild (TCTableComponent) tabletc:TCTableComponent | undefined;
  public searchForm!:FormGroup;
  getSearchStudent:any={};
  showTable:boolean=false;
  tc:any;
  getStudent:any=[];
  dataTable:any;
  getPurchases:any=[];
  dtOptions: DataTables.Settings = {};
  title='pagination';
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];
  page:number=1;
  count:number=0;
  isData:boolean | undefined;
  noData:string | undefined;
  date:Date| undefined;
  errorMessage:String | undefined;

  constructor(private formBuilder:FormBuilder,private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.searchForm=this.formBuilder.group({
     
      studentNAme:[''],
      admission_No:[''],
    
    })
  }

  OnTableDataChange(event:any)
  {
    this.page = event;
 
    // this.getAllPurchase();
    // this.getDate();
    }
 
  OnTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    // this.getAllPurchase();
  }
search()
{ 

  if(!this.searchForm.value.admission_No || !this.searchForm.value.studentNAme)
  {
    alert("Please fill all the fields")
  }
  else
  {
    this.http.get<any>("http://localhost:3333/TC").subscribe((res: any[])=>{
      const tc=res.find((a:any)=>{
        console.log("database",a.admission_No, a.studentNAme)
        console.log("frontend",this.searchForm.value.admission_No, this.searchForm.value.studentNAme )

       return a.admission_No===this.searchForm.value.admission_No &&
               a.studentNAme===this.searchForm.value.studentNAme 
     });

     if(tc)
     {
        console.log("tc",tc);
        this.getSearchStudent=tc;
        this.showTable=true;
        console.log("getsearch",this.getSearchStudent);
        this.searchForm.reset();
 
       // this.router.navigate(['TC']);
     }
     else{
       alert("student not found");
     }
   
   },err=>{
     alert("something went wrong !!")
   })
  }

}

download()
{
  alert(this.getSearchStudent.uploadDocument);
}
}
