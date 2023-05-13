import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateVehicleUtilizationDto } from './dto/create-vehicle-utilization.dto';
import { DriversService } from '../drivers/drivers.service';
import { VehicleUtilization } from './entities/vehicle-utilization.entity';
import { VehiclesService } from '../vehicles/vehicles.service';
import { v4 } from 'uuid';

@Injectable()
export class VehicleUtilizationsService {
  vehicleUtilizations: VehicleUtilization[] = [];

  constructor(
    private driversService: DriversService,
    private vehiclesService: VehiclesService,
  ) {}

  create(createVehicleUtilizationDto: CreateVehicleUtilizationDto) {
    const driver = this.driversService.findOne(
      createVehicleUtilizationDto.driverId,
    );

    const vehicle = this.vehiclesService.findOne(
      createVehicleUtilizationDto.vehicleId,
    );

    if (
      this.vehicleUtilizations.find(
        (vehicleUtilization) =>
          vehicleUtilization.driverId === driver.id &&
          !vehicleUtilization.endDate,
      )
    ) {
      throw new ConflictException('This driver is already using a vehicle');
    }

    if (
      this.vehicleUtilizations.find(
        (vehicleUtilization) =>
          vehicleUtilization.vehicleId === vehicle.id &&
          !vehicleUtilization.endDate,
      )
    ) {
      throw new ConflictException('This vehicle is already being used');
    }

    const newVehicleUtilization: VehicleUtilization = {
      ...createVehicleUtilizationDto,
      id: v4(),
      startDate: new Date(),
    };

    this.vehicleUtilizations.push(newVehicleUtilization);

    return newVehicleUtilization;
  }

  findAll() {
    return this.vehicleUtilizations.map((vehicleUtilization) => {
      const driver = this.driversService.findOne(vehicleUtilization.driverId);
      const vehicle = this.vehiclesService.findOne(
        vehicleUtilization.vehicleId,
      );

      return {
        ...vehicleUtilization,
        driver,
        vehicle,
      };
    });
  }

  finalizeVehicleUtilization(driverId: string) {
    const driver = this.driversService.findOne(driverId);

    const i = this.vehicleUtilizations.findIndex(
      (vehicleUtilization) => vehicleUtilization.driverId === driver.id,
    );

    if (i === -1) {
      throw new NotFoundException('This driver is not using a vehicle');
    }

    this.vehicleUtilizations[i].endDate = new Date();

    return this.vehicleUtilizations[i];
  }
}
