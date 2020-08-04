import crypto from 'crypto';
import IRandomEnrollment from '../models/IRandomEnrollment';

export default class FakeRandomEnrollment implements IRandomEnrollment {
  public generated(): string {
    return crypto.randomBytes(8).toString('hex');
  }
}
