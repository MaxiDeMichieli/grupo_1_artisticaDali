module.exports = function(sequelize, dataTypes){
    let alias = 'Products';

    let cols= {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        precio:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        descuento:{
            type:dataTypes.INTEGER(11)
        },
        descripcion:{
            type:dataTypes.STRING(800)
        },
        subcategoria_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = modelos =>{
        Product.belongsTo(modelos.Subcategories,{
            as:'subcategoria',
            foreignKey:'subcategoria_id'
        });
        Product.hasMany(modelos.ProductImages, {
            as: 'imagenes',
            foreignKey: 'producto_id'
        });
        Product.belongsToMany(modelos.Users, {
            as: 'carrito',
            through: 'carts',
            foreignKey: 'producto_id',
            otherKey: 'usuario_id',
            timestamps: false
        });
        Product.belongsToMany(modelos.Purchases, {
            as: 'compras',
            through: 'purchase_id',
            foreignKey: 'producto_id',
            otherKey: 'compra_id',
            timestamps: false
        });
    }

    return Product;
}