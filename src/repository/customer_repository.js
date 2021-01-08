const logger = require('winston');

const Constants = require('../util/constants');
const { Customer } = require('../model/customer');

// Repository to handle Customer data
class CustomerRepository {
  async createCustomer(customer) {
    try {
      return await customer.save();
    } catch (err) {
      logger.error('Error occurred while saving Customer data.', err);
      throw new Error('Error occurred while saving Customer data.', err);
    }
  }

  async getCustomers(searchName, sortField, sortOrder, pageNum) {
    // Default sort by First Name
    if (!sortField || !sortOrder) {
      sortField = 'fName'
      sortOrder = 1
    }
    let sortObj = {};
    sortObj[sortField] = sortOrder

    if (!pageNum)
      pageNum = 1

    try {
      if (!searchName)
        return await Customer.find()
          .sort(sortObj)
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
      else
        return await Customer.find({ $or: [{ 'fName': `/${searchName}/` }, { 'lName': `/${searchName}/` }] })
          .sort(sortObj)
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Customer data.', err);
      throw new Error('Error occurred while retrieving Customer data.', err);
    }
  }

  async getCustomerById(id) {
    try {
      return await Customer.findById(id).select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error(
        'Error occurred while retrieving Customer for Id: ' + id,
        err
      );
      throw new Error(
        'Error occurred while retrieving Customer for Id: ' + id,
        err
      );
    }
  }

  async updateCustomer(id, payload) {
    try {
      return await Customer.findByIdAndUpdate(id, {
        $set: {
          fName: payload.fName,
          lName: payload.lName,
          phone: payload.phone,
          isGold: payload.isGold
        },
        $currentDate: {
          updatedAt: 1
        }
      });
    } catch (err) {
      logger.error('Error occurred while updating Customer for Id: ' + id, err);
      throw new Error(
        'Error occurred while updating Customer for Id: ' + id,
        err
      );
    }
  }

  async deleteCustomer(id) {
    try {
      return await Customer.findByIdAndRemove(id);
    } catch (err) {
      logger.error('Error occurred while deleting Customer for Id: ' + id, err);
      throw new Error(
        'Error occurred while deleting Customer for Id: ' + id,
        err
      );
    }
  }
}

module.exports = CustomerRepository;
