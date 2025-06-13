'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('product', 'product_createdBy_fkey');
    await queryInterface.addConstraint('product', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'product_createdBy_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('product', 'product_createdBy_fkey');
    await queryInterface.addConstraint('product', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'product_createdBy_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    });
  }
};