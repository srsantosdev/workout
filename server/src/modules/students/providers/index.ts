import { container } from 'tsyringe';

import IRandomEnrollment from './RandomEnrollment/models/IRandomEnrollment';
import CryptoRandomStringRandomEnrollment from './RandomEnrollment/implementations/CryptoRandomStringRandomEnrollment';

container.registerSingleton<IRandomEnrollment>(
  'RandomEnrollmentProvider',
  CryptoRandomStringRandomEnrollment,
);
