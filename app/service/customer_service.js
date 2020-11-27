const CustomerRepository = require('../repository/customer_repository');
const customerRepository = new CustomerRepository();

const _buildCustomer = Symbol();

class CustomerService {
    async createCustomer(payload) {
        try {
            let customer = this[_buildCustomer](payload);
            return await customerRepository.createCustomer(customer);
        } catch (err) {
            throw err;
        }
    }

    async getCustomers(pageNum) {
        try {
            return await customerRepository.getCustomers(pageNum);
        } catch (err) {
            throw err;
        }
    }

    async getCustomerById(id) {
        try {
            return await customerRepository.getCustomerById(id);
        } catch (err) {
            throw err;
        }
    }

    async updateCustomer(id, payload) {
        try {
            return await customerRepository.updateCustomer(id, payload);
        } catch (err) {
            throw err;
        }
    }

    async deleteCustomer(id) {
        try {
            return await customerRepository.deleteCustomer(id);
        } catch (err) {
            throw err;
        }
    }

    [_buildCustomer](payload) {
        return new Customer({
            name: payload.name,
            phone: payload.phone,
            isGold: payload.isGold
        });
    }
}

module.exports = CustomerService;
