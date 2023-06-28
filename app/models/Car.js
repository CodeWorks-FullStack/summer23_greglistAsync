import { AppState } from "../AppState.js"

export class Car {
  constructor (data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.engineType = data.engineType
    this.color = data.color || '#000000'
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    // NOTE creator is an object keeping track of the details of who created this car. Has an id, name, and picture
    this.creator = data.creator
  }

  get CardTemplate() {
    return `
    <div class="col-10 m-auto mb-3">
      <section class="row bg-light elevation-5 car-border" style="border-color: ${this.color};">
        <div class="col-12 col-md-4 p-0">
          <img class="img-fluid car-img"
            src="${this.imgUrl}"
            alt="${this.make} ${this.model}">
            </div>
            <div class="col-12 col-md-8 p-3">
            <h2>${this.year} ${this.make} ${this.model}</h2>
            <h3>$${this.price}</h3>
            <p>${this.description}</p>
            <h4>${this.createdAt.toLocaleString()}</h4>
            <div class="d-flex align-items-center mb-3">
              <h5 class="me-3">${this.creator.name}</h5>
              <img class="img-fluid creator-picture"
                src="${this.creator.picture}"
                alt="${this.creator.name}">
            </div>
            ${this.ComputeDeleteButton}
            ${this.ComputeEditButton}
        </div>
      </section>
    </div>
    `
  }

  get ComputeDeleteButton() {
    // NOTE if the user isn't logged in OR if the logged in user did not create this car
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }

    return `<button onclick="app.CarsController.deleteCar('${this.id}')" class="btn btn-danger">Delete Car</button>`
  }
  get ComputeEditButton() {
    // NOTE if the user isn't logged in OR if the logged in user did not create this car
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `<button onclick="app.CarsController.drawEditForm('${this.id}')" class="btn ms-3 btn-info">Edit Car</button>`
  }

  get EditForm() {
    // NOTE pulls the properties from this class and sets them to the values of each input field, so that the user does not have to re-fill in the entire form when performing an edit
    return `
    <div class="card card-body">
      <form onsubmit="app.CarsController.editCar(event, '${this.id}')">

        <div>
          <label for="carMake">Make</label>
          <input type="text" id="carMake" minlength="3" maxlength="30" required name="make" value="${this.make}">
        </div>

        <div>
          <label for="carModel">Model</label>
          <input type="text" id="carModel" minlength="3" maxlength="40" required name="model" value="${this.model}">
        </div>

        <div>
          <label for="carYear">Year</label>
          <!-- <input type="range" id="carYear" name="year" min="1970" max="2024"> -->
          <input id="carYear" type="number" min="1970" max="2024" required name="year" value="${this.year}">
        </div>

        <div>
          <label for="carImg">Image URL</label>
          <input type="url" id="carImg" maxlength="300" required name="imgUrl" value="${this.imgUrl}">
        </div>

        <div>
          <label for="carPrice">Price</label>
          <input class="w-100" type="range" id="carPrice" name="price" min="1" max="100000" value="${this.price}">
        </div>

        <div>
          <label for="carDescription">Description</label>
          <textarea id="carDescription" name="description" rows="10" class="w-50">
          ${this.description}
        </textarea>
        </div>

        <div>
          <label for="carColor">Color</label>
          <input type="color" id="carColor" name="color" required value="${this.color}">
        </div>

        <button type="submit">Edit Car</button>
      </form>

    </div>
    `
  }

  // NOTE static methods only exist on a non-built out version of the Car class.
  // NOTE ❌ new Car().CreateForm
  // NOTE ✅ Car.CreateForm
  static get CreateForm() {
    return `
    <form onsubmit="app.CarsController.createCar(event)">

        <div>
          <label for="carMake">Make</label>
          <input type="text" id="carMake" minlength="3" maxlength="30" required name="make">
        </div>

        <div>
          <label for="carModel">Model</label>
          <input type="text" id="carModel" minlength="3" maxlength="40" required name="model">
        </div>

        <div>
          <label for="carYear">Year</label>
          <!-- <input type="range" id="carYear" name="year" min="1970" max="2024"> -->
          <input id="carYear" type="number" min="1970" max="2024" required name="year">
        </div>

        <div>
          <label for="carImg">Image URL</label>
          <input type="url" id="carImg" maxlength="300" required name="imgUrl">
        </div>

        <div>
          <label for="carPrice">Price</label>
          <input class="w-100" type="range" id="carPrice" name="price" min="1" max="100000" value="10000">
        </div>

        <div>
          <label for="carDescription">Description</label>
          <textarea id="carDescription" name="description" rows="10" class="w-50">
        </textarea>
        </div>

        <div>
          <label for="carColor">Color</label>
          <input type="color" id="carColor" name="color" value="#e66465" required>
        </div>

        <button type="submit">Submit</button>
      </form>
    `
  }

}



// NOTE we pull this from the console to make it easier to see what our data looks like and build out our class
// let carData = {
//   "_id": "6462ed1266d4560e6cfa0f39",
//   "id": "6462ed1266d4560e6cfa0f39",
//   "make": "Honda",
//   "model": "Accord",
//   "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/dsc00620-1677186777.jpg?crop=0.606xw:0.680xh;0.298xw,0.260xh&resize=640:*",
//   "year": 2022,
//   "price": 1500,
//   "description": "zoom zoom",
//   "engineType": "unknown",
//   "creatorId": "63f7d6202d1cf882287f12e2",
//   "createdAt": "2023-05-16T02:40:18.318Z",
//   "updatedAt": "2023-05-16T02:40:18.318Z",
//   "__v": 0,
//   "creator": {
//     "_id": "63f7d6202d1cf882287f12e2",
//     "name": "Charles Francis Xavier",
//     "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
//     "id": "63f7d6202d1cf882287f12e2"
//   },
// }