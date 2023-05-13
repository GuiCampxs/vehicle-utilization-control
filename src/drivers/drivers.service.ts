import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { v4 } from 'uuid';

@Injectable()
export class DriversService {
  drivers: Driver[] = [];

  create(createDriverDto: CreateDriverDto) {
    const newDriver = {
      ...createDriverDto,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.drivers.push(newDriver);

    return newDriver;
  }

  findAll(name?: string) {
    if (!name) {
      return this.drivers;
    }

    return this.drivers.filter((driver) => driver.name === name);
  }

  findOne(id: string) {
    const driver = this.drivers.find((driver) => driver.id === id);

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    const driverIndex = this.drivers.findIndex((driver) => driver.id === id);

    if (driverIndex === -1) {
      return;
    }

    this.drivers[driverIndex] = {
      ...this.drivers[driverIndex],
      ...updateDriverDto,
      updatedAt: new Date(),
    };

    return this.drivers[driverIndex];
  }

  remove(id: string) {
    this.drivers = this.drivers.filter((driver) => driver.id !== id);
  }
}
