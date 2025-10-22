const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ProductOffer = sequelize.define('ProductOffer', {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specs: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  priceOriginal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  priceDiscount: {
    type: DataTypes.VIRTUAL,
    get() {
      const price = this.getDataValue('priceOriginal');
      const discount = this.getDataValue('discount');
      return price - (price * (discount / 100));
    },
    set(value) {
      throw new Error('Do not try to set priceDiscount directly.');
    }
  },
  priceSwapcoins: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  img1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = ProductOffer;
