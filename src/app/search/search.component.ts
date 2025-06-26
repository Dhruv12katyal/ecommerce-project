import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private activeRoute : ActivatedRoute, private product : ProductService){}
  searchResult : undefined|product[];
  searchMessage : undefined|string;
  ngOnInit(){
    this.activeRoute.paramMap.subscribe(params => {
    const query = params.get('query');
    if (query) {
      this.product.searchProduct(query).subscribe((result) => {
        this.searchResult = result;
        if (this.searchResult.length === 0) {
          this.searchMessage = "No result found";
          setTimeout(() => {
            this.searchMessage = undefined;
          }, 3000);
        }
      });
    }
  });
  }

}
