import cryptoRandomString from 'crypto-random-string';

import IRandomEnrollment from '../models/IRandomEnrollment';

export default class CryptoRandomStringRandomEnrollment
  implements IRandomEnrollment {
  public generated(): string {
    const randomNumber = cryptoRandomString({ length: 2, type: 'numeric' });
    const randomString = cryptoRandomString({ length: 4, type: 'numeric' });
    const date = new Date();

    return `${randomNumber}${date
      .getFullYear()
      .toString()
      .slice(2)}${randomString}`;
  }
}
