// const dbConfig = require('../../app/init/db_config');

// test('dbConfigTest', () => {

//     // Checking for an number return type
//     // let result = dbConfig();
//     // expect(result).toBe(1);
// });

// // Grouping tests
// decribe('groupA', () => {
//     it('test1', () => {

//     });

//     it('test2', () => {

//     });
// });

// // For arrays
// let arr = ['A', 'B', 'C'];
// let result = arr;
// expect(result).toEqual(expect.arrayContaining(arr));

// // For objects
// // expect(result).toEqual({id: 1, name: 'A'});

// // Mock functions
// let mockFunction = jest.fn();
// mockFunction.mockReturnValue(1);    // Retrun int 1

// // Returning a promise
// mockFunction.mockResolvedValue(1);
// // mockFunction.mockRejectedValue(new Error('Error')); // Promise rejected
// let result = await mockFunction();

// // Example
// let f = function (id) {
//     let c = db.getCustomerById(id);
//     mail.send(c.email);
// }

// describe('testF', () => {
//     it('test1', () => {
//         db.getCustomerById = jest.fn().mockReturnValue({ email: 'abc@gmail.com' });
//         mail.send = jest.fn();

//         f(1);

//         expect(mail.send).toHaveBeenCalled();
//         expect(mail.send).toHaveBeenCalledWith('abc@gmail.com');    // Verify method arguments as well
//     })
// })
