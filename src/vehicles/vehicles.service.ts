import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FindVehiclesDto } from './dto/find-vehicles.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { v4 } from 'uuid';

@Injectable()
export class VehiclesService {
  vehicles: Vehicle[] = [];

  create(createVehicleDto: CreateVehicleDto) {
    const newVehicle: Vehicle = {
      ...createVehicleDto,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.vehicles.push(newVehicle);

    return newVehicle;
  }

  findAll(query: FindVehiclesDto) {
    const keys = Object.keys(query);

    if (keys.length === 0) {
      return this.vehicles;
    }

    let filteredVehicles: Vehicle[] = this.vehicles;

    keys.forEach((key) => {
      if (query[key]) {
        filteredVehicles = filteredVehicles.filter(
          (vehicle) => vehicle[key] === query[key],
        );
      }
    });

    return filteredVehicles;
  }

  findOne(id: string) {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicleIndex = this.vehicles.findIndex(
      (vehicle) => vehicle.id === id,
    );

    if (vehicleIndex === -1) {
      return;
    }

    this.vehicles[vehicleIndex] = {
      ...this.vehicles[vehicleIndex],
      ...updateVehicleDto,
      updatedAt: new Date(),
    };

    return this.vehicles[vehicleIndex];
  }

  remove(id: string) {
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
