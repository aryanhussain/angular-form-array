import { Component } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  productForm: FormGroup;
  productSKUs = [
    { name: "foo1", value: "11" },
    { name: "bar1", value: "21" },
    { name: "car1", value: "31" },
    { name: "foo2", value: "12" },
    { name: "bar2", value: "22" },
    { name: "car2", value: "32" },
    { name: "foo3", value: "13" },
    { name: "bar3", value: "23" },
    { name: "car3", value: "33" },
    { name: "foo4", value: "14" },
    { name: "bar4", value: "24" },
    { name: "car4", value: "34" },
    { name: "foo5", value: "15" },
    { name: "bar5", value: "25" },
    { name: "car5", value: "35" }
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
    this.productCode[i] = this.productSKUs.filter(element => {
      if (!this.selectedSKU.includes(element.value)) {
        return element;
      }
    });
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray;
  }

  newQuantity(): FormGroup {
    this.getproductCodeData(this.quantities().length)
    return this.fb.group({
      code: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  addQuantity() {
    this.selectedSKU = [];
    this.productForm.value.quantities.forEach(element => {
      this.selectedSKU.push(element.code);
    });
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    if (i > -1) {
      this.productForm.value.quantities.splice(i, 1);
      this.quantities().removeAt(i);
    }
  }

  onSubmit() {
    this.Submitted = true;
    console.log(this.productForm.value);
  }

  resetForm() {
    this.productForm.reset();
    const control = <FormArray>this.productForm.controls['quantities'];
    for (let i = control.length - 1; i > 0; i--) {
      control.removeAt(i)
    }
    this.newQuantity();
  }
}
