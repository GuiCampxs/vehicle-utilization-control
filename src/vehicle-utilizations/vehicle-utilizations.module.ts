import { DriversModule } from '../drivers/drivers.module';
import { Module } from '@nestjs/common';
import { VehicleUtilizationsController } from './vehicle-utilizations.controller';
import { VehicleUtilizationsService } from './vehicle-utilizations.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [DriversModule, VehiclesModule],
  controllers: [VehicleUtilizationsController],
  providers: [VehicleUtilizationsService],
})
export class VehicleUtilizationsModule {}
