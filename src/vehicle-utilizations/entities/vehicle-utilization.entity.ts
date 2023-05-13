import { Driver } from '../../drivers/entities/driver.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

export class VehicleUtilization {
  id: string;
  startDate: Date;
  driverId: string;
  vehicleId: string;
  reason: string;

  endDate?: Date;
  driver?: Driver;
  vehicle?: Vehicle;
}
