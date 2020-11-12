module.exports = function(sequelize, dataTypes){
    let alias = 'Users';

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
        apellido:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        email:{
            type:dataTypes.STRING(60),
            allowNull:false
        },
        password:{
            type:dataTypes.STRING(70),
            defaultValue: null
        },
        telefono:{
            type:dataTypes.STRING(30),
            defaultValue: null
        },
        calle:{
            type:dataTypes.STRING(45),
            defaultValue: null
        },
        numero:{
            type:dataTypes.INTEGER(11),
            defaultValue: null
        },
        dpto:{
            type:dataTypes.STRING(10),
            defaultValue: null
        },
        cp:{
            type:dataTypes.STRING(15),
            defaultValue: null
        },
        provincia:{
            type:dataTypes.STRING(45),
            defaultValue: null
        },
        localidad:{
            type:dataTypes.STRING(45),
            defaultValue: null
        },
        rol:{
            type:dataTypes.BOOLEAN,
            defaultValue:0,
            allowNull:false
        },
        social_id: {
            type:dataTypes.STRING(60),
            defaultValue: null
        },
        social_provider: {
            type:dataTypes.STRING(45),
            defaultValue: null
        }
    }

    let config = {
        tableName: "users",
        timestamps: true,
        underscored: true
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (modelos) => {
        User.belongsToMany(modelos.Products, {
            as: 'carrito',
            through: 'carts',
            foreignKey: 'usuario_id',
            otherKey: 'producto_id',
            timestamps: false
        });
        User.hasMany(modelos.Purchases, {
            as: 'compras',
            foreignKey: 'usuario_id'
        })
    }

    return User;
}