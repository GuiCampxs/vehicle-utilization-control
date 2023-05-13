import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VehicleUtilizationsService } from './vehicle-utilizations.service';
import { CreateVehicleUtilizationDto } from './dto/create-vehicle-utilization.dto';

@Controller('vehicle-utilizations')
export class VehicleUtilizationsController {
  constructor(
    private readonly vehicleUtilizationsService: VehicleUtilizationsService,
  ) {}

  @Post()
  create(@Body() createVehicleUtilizationDto: CreateVehicleUtilizationDto) {
    return this.vehicleUtilizationsService.create(createVehicleUtilizationDto);
  }

  @Get()
  findAll() {
    return this.vehicleUtilizationsService.findAll();
  }

  @Patch('/driver/:driverId/finalize')
  update(@Param('driverId') driverId: string) {
    return this.vehicleUtilizationsService.finalizeVehicleUtilization(driverId);
  }
}
