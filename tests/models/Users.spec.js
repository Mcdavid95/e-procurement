import chai from 'chai';

import Buyer from '../../models/Buyer';
import users from '../__mocks__/users.json';

const { expect } = chai;

describe('User Model', () => {
  before((done) => {
    Buyer.remove({}, () => {
    });
    done();
  });
  it('should return a new user registration data', (done) => {
    const newUser = new Buyer(users[0]);

    expect(typeof newUser).to.equal('object');
    expect(newUser.firstname).to.equal(users[0].firstname);
    expect(newUser.lastname).to.equal(users[0].lastname);
    expect(newUser.email).to.equal(users[0].email);
    expect(newUser).to.have.a.property('password');
    expect(newUser).to.have.a.property('_id');
    done();
  });
});
