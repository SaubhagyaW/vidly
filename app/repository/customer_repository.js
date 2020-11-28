const Constants = require('../util/constants');
const { Customer } = require('../model/customer');

// Repository to handle Customer data
class CustomerRepository {
    async createCustomer(customer) {
        try {
            return customer.save();
        } catch (err) {
            console.error('Error occurred while saving Customer data.', err);
            throw new Error('Error occurred while saving Customer data.', err);
        }
    }

    async getCustomers(pageNum) {
        try {
            return await Customer
                .find()
                .skip((pageNum - 1) * Constants.pageSize)
                .limit(Constants.pageSize)
                .sort('name')
                .select(Constants.hiddenFields);
        } catch (err) {
            console.error('Error occurred while retrieving Customer data.', err);
            throw new Error('Error occurred while retrieving Customer data.', err);
        }
    }

    async getCustomerById(id) {
        try {
            return await Customer
                .findById(id)
                .select(Constants.hiddenFields);
        } catch (err) {
            console.error('Error occurred while retrieving Customer for Id: ' + id, err);
            throw new Error('Error occurred while retrieving Customer for Id: ' + id, err);
        }
    }

    async updateCustomer(id, payload) {
        try {
            return await Customer.findByIdAndUpdate(id, {
                $set: {
                    name: payload.name,
                    phone: payload.phone,
                    isGold: payload.isGold
                },
                $currentDate: {
                    updatedAt: 1
                }
            });
        } catch (err) {
            console.error('Error occurred while updating Customer for Id: ' + id, err);
            throw new Error('Error occurred while updating Customer for Id: ' + id, err);
        }
    }

    async deleteCustomer(id) {
        try {
            return await Customer.findByIdAndRemove(id);
        } catch (err) {
            console.error('Error occurred while deleting Customer for Id: ' + id, err);
            throw new Error('Error occurred while deleting Customer for Id: ' + id, err);
        }
    }
}

module.exports = CustomerRepository;
