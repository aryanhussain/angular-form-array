import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection:ChangeDetectionStrategy.Default,
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  productForm: FormGroup;
  productSKUs = [
    { name: "foo1", value: "11", disbaled: false },
    { name: "bar1", value: "21", disbaled: false },
    { name: "car1", value: "31", disbaled: false },
    { name: "foo2", value: "12", disbaled: false },
    { name: "bar2", value: "22", disbaled: false },
    { name: "car2", value: "32", disbaled: false },
    { name: "foo3", value: "13", disbaled: false },
    { name: "bar3", value: "23", disbaled: false },
    { name: "car3", value: "33", disbaled: false },
    { name: "foo4", value: "14", disbaled: false },
    { name: "bar4", value: "24", disbaled: false },
    { name: "car4", value: "34", disbaled: false },
    { name: "foo5", value: "15", disbaled: false },
    { name: "bar5", value: "25", disbaled: false },
    { name: "car5", value: "35", disbaled: false }
  ];
  productCode: any = {}
  selectedSKU: any = [];
  Submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      quantities: this.fb.array([])
    });
    this.addQuantity()
  }

  getproductCodeData(i) {
    this.productCode[i] = this.productSKUs.map(element => {
      if (this.selectedSKU.includes(element.value)) {
        element.disbaled = true
      } else {
        element.disbaled = false
      }
      return element
    });
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray;
  }

  newQuantity(): FormGroup {
    this.getproductCodeData(this.quantities().length)
    return this.fb.group({
      code: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(50000)]],
    });
  }

  addQuantity() {
    this.selectedSKU = [];
    this.productForm.value.quantities.forEach(element => {
      this.selectedSKU.push(element.code);
    });
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i: number, code: string) {
    if (i > -1) {
      this.productForm.value.quantities.splice(i, 1);
      let _index = this.productSKUs.findIndex(i => {
        return i.value == code
      })
      if(_index >-1)
        this.productSKUs[_index].disbaled = false;
      this.quantities().removeAt(i);
    }
  }

  onSubmit() {
    this.Submitted = true;
    console.log(this.productForm.value);
  }

  resetForm() {
    this.productForm.reset();
    this.productSKUs.forEach(element => {
      element.disbaled = false;
    });
    const control = <FormArray>this.productForm.controls['quantities'];
    for (let i = control.length - 1; i > 0; i--) {
      control.removeAt(i)
    }
  }
}
