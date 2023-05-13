import { Test, TestingModule } from '@nestjs/testing';

import { DriversModule } from '../drivers/drivers.module';
import { VehicleUtilizationsService } from './vehicle-utilizations.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

describe('VehicleUtilizationsService', () => {
  let service: VehicleUtilizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleUtilizationsService],
      imports: [DriversModule, VehiclesModule],
    }).compile();

    service = module.get<VehicleUtilizationsService>(
      VehicleUtilizationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
