module.exports = (sequelize, dataTypes) =>{

    let alias = 'Carts';

    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false    
        },
        usuario_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        producto_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: 'carts'
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (modelos) => {
        Cart.belongsTo(modelos.Users, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
        Cart.belongsTo(modelos.Products, {
            as: 'producto',
            foreignKey: 'producto_id'
        })
    }

    return Cart

}