import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {iReport} from '../../interfaces/report'


const ID_KEY = "tester-id"

const ITEMS_KEY = "previous-reports";

@Injectable()
export class TesterDetailsProvider {

  testerId: String = "";

  constructor(public http: HttpClient, private storage:Storage) {


  }

  addTesterID(testerId:String){

    this.storage.set(ID_KEY, testerId)

    // return this.storage.get(ID_KEY).then((id:String[]) => {

    //   if(id){

    //     id.push(testerId);

    //     return this.storage.set(ID_KEY, id)

    //   } else {

    //     return this.storage.set(ID_KEY, [testerId])
    //   }

    // });

  }

  getTesterID(){

    this.storage.get(ID_KEY).then((val) =>{

      this.testerId = val;
      console.log("The tester Id is")
      console.log(this.testerId);

    }

    )

  }

  addItem(report:iReport): Promise<any>{

    return this.storage.get(ITEMS_KEY).then((reports:iReport[]) => {

      if(reports){

        reports.push(report);

        return this.storage.set(ITEMS_KEY, reports)

      } else {

        return this.storage.set(ITEMS_KEY, [report])
      }

    });

  }

  getItems(): Promise<iReport[]>{

   return this.storage.get(ITEMS_KEY);
  }

}