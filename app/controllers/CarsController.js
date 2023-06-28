import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars
  let template = ''
  cars.forEach(car => template += car.CardTemplate)
  setHTML('whipsList', template)
}

function _showFormButton() {
  // NOTE AppState.account is where we store the details about the logged in user
  const account = AppState.account

  // NOTE account will be null in the AppState if no one is logged in
  if (!account) {
    return
  }


  const carFormButton = document.getElementById('carFormButton')

  // NOTE if the user is logged in, we remove the "display: none" bootstrap class from our car button so a logged in user can create cars
  carFormButton.classList.remove('d-none')
}


export class CarsController {
  constructor () {
    // SECTION page load

    console.log('cars controller loaded');
    this.getCars()
    // NOTE injects our create car form into our HTML
    this.drawCarForm()


    // SECTION state changes

    AppState.on('cars', _drawCars)

    // NOTE whenever cars are drawn or redrawn, we redraw our form so that it potentially clears out our edit form
    AppState.on('cars', this.drawCarForm)
    // NOTE we redraw our cars when a user logs in so that we rerun our getters in the car template
    AppState.on('account', _drawCars)
    // NOTE we show a button to create a car when a user is logged in
    AppState.on('account', _showFormButton)
  }

  drawEditForm(carId) {
    const foundCar = AppState.cars.find(car => car.id == carId)

    const carForm = document.getElementById('car-form')

    // NOTE injects our edit form for the specific car that we clicked on to edit with populated input fields
    setHTML('car-form', foundCar.EditForm)

    // NOTE this line opens our bootstrap collapse so that we can see our form and scroll to it automatically
    // @ts-ignore
    bootstrap.Collapse.getOrCreateInstance('#carCollapse').show()

    // NOTE scrolls to our carForm element
    carForm.scrollIntoView()
  }

  drawCarForm() {
    // NOTE Car.CreateForm is a static method. Only exists on an uninstantiated class. This getter returns our create car form
    setHTML('car-form', Car.CreateForm)
  }

  // REVIEW CRUD ROUTES
  // CREATE (POST)
  // READ (GET)
  // UPDATE (PUT)
  // DESTROY (DELETE)



  // REVIEW READ / GET
  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW CREATE
  async createCar(event) {
    try {
      event.preventDefault()

      const form = event.target

      const carData = getFormData(form)

      console.log('car data!', carData);

      await carsService.createCar(carData)

      form.reset()

      // NOTE hides our bootstrap collapse after car is created
      // @ts-ignore
      bootstrap.Collapse.getOrCreateInstance('#carCollapse').hide()

    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW DELETE
  async deleteCar(carId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this car?')

      if (!wantsToDelete) {
        return
      }


      await carsService.deleteCar(carId)
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW UPDATE
  // NOTE we need the ID of the car that we want to edit, so we pass that ID through when we call this method
  async editCar(event, carId) {
    try {
      // NOTE we still use our form to edit our car, so this looks very similar to our create method
      event.preventDefault()

      const form = event.target

      const carData = getFormData(form)

      console.log('car data!', carData);
      console.log('car id!', carId);

      await carsService.editCar(carData, carId)

      // NOTE hides our bootstrap collapse after car is edited
      // @ts-ignore
      bootstrap.Collapse.getOrCreateInstance('#carCollapse').hide()

    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

}