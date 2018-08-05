import chai from 'chai';

import User from '../../models/User';
import users from '../__mocks__/users.json';

const { expect } = chai;

describe('User Model', () => {
  before((done) => {
    User.remove({}, () => {
    });
    done();
  });
  it('should return a new user registration data', (done) => {
    const newUser = new User(users[0]);

    expect(typeof newUser).to.equal('object');
    expect(newUser.firstname).to.equal(users[0].firstname);
    expect(newUser.lastname).to.equal(users[0].lastname);
    expect(newUser.email).to.equal(users[0].email);
    expect(newUser).to.have.a.property('password');
    expect(newUser).to.have.a.property('_id');
    done();
  });
});
