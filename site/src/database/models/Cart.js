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
        },
        cantidad: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1
        }
    }

    let config = {
        tableName: 'carts',
        timestamps: false
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