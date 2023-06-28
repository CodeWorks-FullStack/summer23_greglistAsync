import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js"

class CarsService {


  async getCars() {
    // REVIEW nothing changes too much on this get request

    const res = await api.get('api/cars')

    // REVIEW always log your response, and always look at it in your console
    console.log('got cars', res.data);

    const builtCars = res.data.map(carPojo => new Car(carPojo))

    AppState.cars = builtCars
  }

  async createCar(carData) {
    // NOTE POST requests are used to send data to an API, and have the API potentially store that data in a database
    // NOTE you must be logged in to POST data to the sandbox API (you need a bearer token attached to your request headers)
    // NOTE POST requests (almost) always have a request body
    // NOTE the second argument we pass to axios here becomes the request body
    const res = await api.post('api/cars', carData)

    // REVIEW always log your response, and always look at it in your console
    console.log('created car????', res.data);

    // NOTE the response from the API was a single car object, no need to map.
    // NOTE only use map for arrays!!!!!
    const builtCar = new Car(res.data)

    AppState.cars.push(builtCar)

    AppState.emit('cars')
  }

  async deleteCar(carId) {
    console.log('car Id', carId);
    // NOTE DELETE requests do not have a request body, but we must provide the id of the item that we want to delete in url parameters
    // NOTE you must be logged in to DELETE data on the sandbox API (you need a bearer token attached to your request headers), and you must be the person who created that data
    const res = await api.delete(`api/cars/${carId}`)

    // REVIEW always log your response, and always look at it in your console
    // NOTE the response from the api was just a string confirming the delete action, it is our job to update the AppState
    console.log('deleted car', res.data);

    const carIndex = AppState.cars.findIndex(car => car.id == carId)

    // NOTE if findIndex callback function never returns a true (or truthy) value, it returns -1. If you provide a negative index to splice it will start splicing at the end of the array which is probably not what we want, so we throw an error if the index is -1
    if (carIndex == -1) {
      // NOTE throw will trigger our catch, so our code will stop running here
      throw new Error(`No car index found with the id of ${carId}`)
    }

    AppState.cars.splice(carIndex, 1)

    AppState.emit('cars')
  }

  async editCar(carData, carId) {
    // NOTE PUT requests have a request body, and also need the ID of the item that we want to update in the URL parameters
    // NOTE you must be logged in to Update data on the sandbox API (you need a bearer token attached to your request headers), and you must be the person who created that data
    const res = await api.put(`api/cars/${carId}`, carData)

    // REVIEW always log your response, and always look at it in your console
    console.log('edited car', res.data);

    // NOTE the response from the API was the updated object
    const updatedCar = new Car(res.data)

    const oldCarIndex = AppState.cars.findIndex(car => car.id == carId)

    if (oldCarIndex == -1) {
      // NOTE throw will trigger our catch, so our code will stop running here
      throw new Error(`No car index found with the id of ${carId}`)
    }

    // NOTE splice can take in multiple arguments, the first argument is where to start splicing, the second argument is how many things to remove, and the third argument is what to put in the array at the index we started splicing at
    AppState.cars.splice(oldCarIndex, 1, updatedCar)

    AppState.emit('cars')
  }
}

export const carsService = new CarsService()