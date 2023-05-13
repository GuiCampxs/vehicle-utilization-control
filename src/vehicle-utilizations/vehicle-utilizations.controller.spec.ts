import { Test, TestingModule } from '@nestjs/testing';

import { DriversModule } from '../drivers/drivers.module';
import { VehicleUtilizationsController } from './vehicle-utilizations.controller';
import { VehicleUtilizationsService } from './vehicle-utilizations.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

describe('VehicleUtilizationsController', () => {
  let controller: VehicleUtilizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleUtilizationsController],
      providers: [VehicleUtilizationsService],
      imports: [VehiclesModule, DriversModule],
    }).compile();

    controller = module.get<VehicleUtilizationsController>(
      VehicleUtilizationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
