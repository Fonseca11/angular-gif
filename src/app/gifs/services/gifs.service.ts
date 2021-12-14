import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey: string = 'w4t4Zzp63ztBlS5k3Uv9kRRhd85v4I11';
    private servicioUrl:string = 'https://api.giphy.com/v1/gifs' ;
    private _historial:string[] = [];

    public resultados: Gif[] = [];

    get historial(){
      // this._historial = this._historial.splice(0,10);
      return [...this._historial];
    }
    
    constructor (private http: HttpClient){
       this._historial = JSON.parse(localStorage.getItem('historial')!)||[];
       this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
       // if(localStorage.getItem('historial')){
      //   this._historial = JSON.parse(localStorage.getItem('historial')!);
      // }

    }

  async buscarGifs(query: string = ''){
    //this._historial.unshift(query);

    query = query.trim().toLocaleLowerCase(); //Para registrar datos y no se repitan

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    
     localStorage.setItem('historial',JSON.stringify(this._historial));

    }
      const params = new HttpParams().set(
        'api_key', this.apiKey)
        .set('limit','10')
        .set('q',query);
      
        console.log(params.toString);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;

      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=w4t4Zzp63ztBlS5k3Uv9kRRhd85v4I11&q=dragon ball z  &limit=10');
    // const data = await resp.json();
    //     console.log(data);
  
  }
}
