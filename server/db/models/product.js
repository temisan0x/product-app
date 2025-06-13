const { Model, DataTypes, Op } = require('sequelize');
const sequelize = require('../../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 500]
    }
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01,
      max: 1000000.00
    }
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10000
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'product',
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
  hooks: {
    beforeCreate: async (product) => {
      product.name = product.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    },
    beforeUpdate: async (product) => {
     product.updatedAt = new Date();
    }
  },
  scopes: {
    active: {
      where: {
        deletedAt: null
      }
    },
    lowStock: {
      where: {
        quantity: {
          [Op.lte]: 10
        }
      }
    }
  }
});

// Product.addHook('beforeCreate', async (product) => {

// });

Product.addScope('recentlyAdded', {
  order: [['createdAt', 'DESC']],
  limit: 10
});

module.exports = Product;