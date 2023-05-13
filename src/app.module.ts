import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleUtilizationsModule } from './vehicle-utilizations/vehicle-utilizations.module';

@Module({
  imports: [DriversModule, VehiclesModule, VehicleUtilizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
