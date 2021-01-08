const _ = require('lodash');

const { Customer } = require('../model/customer');
const CustomerRepository = require('../repository/customer_repository');
const UserRepository = require('../repository/user_repository');

const _buildCustomer = Symbol();

// Service layer for Customer related operations
class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
    this.userRepository = new UserRepository();
  }

  async createCustomer(payload, user) {
    try {
      let customer = await this[_buildCustomer](payload, user.email);
      return await this.customerRepository.createCustomer(customer);
    } catch (err) {
      throw err;
    }
  }

  async getCustomers(searchName, sortField, sortOrder, pageNum) {
    try {
      return await this.customerRepository.getCustomers(
        searchName,
        sortField,
        sortOrder,
        pageNum
      );
    } catch (err) {
      throw err;
    }
  }

  // async getCustomerById(id) {
  //     try {
  //         return await customerRepository.getCustomerById(id);
  //     } catch (err) {
  //         throw err;
  //     }
  // }

  // async updateCustomer(id, payload) {
  //     try {
  //         return await customerRepository.updateCustomer(id, payload);
  //     } catch (err) {
  //         throw err;
  //     }
  // }

  // async deleteCustomer(id) {
  //     try {
  //         return await customerRepository.deleteCustomer(id);
  //     } catch (err) {
  //         throw err;
  //     }
  // }

  async [_buildCustomer](payload, email) {
    let cutomer = new Customer(_.pick(payload, ['fName', 'lName', 'phone', 'isGold']));

    try {
      let user = await this.userRepository.getUserIdByEmail(email);
      cutomer.createdBy = user._id;
      cutomer.updatedBy = user._id;
      return cutomer;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CustomerService;
