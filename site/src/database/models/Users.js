module.exports = function(sequelize, dataTypes){
    let alias = 'User';

    let cols= {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autonIncrement:true,
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
            allowNull:false
        },
        telefono:{
            type:dataTypes.STRING(30),
        },
        calle:{
            type:dataTypes.STRING(45),
        },
        numero:{
            type:dataTypes.INTEGER(11),
        },
        dpto:{
            type:dataTypes.STRING(10),
        },
        cp:{
            type:dataTypes.STRING(15),
        },
        provincia:{
            type:dataTypes.STRING(45),
        },
        localidad:{
            type:dataTypes.STRING(45),
        },
        rol:{
            type:dataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:0
        }
    }

    let config = {
        tableName: "users",
        timestamps:false
    }

    const User = sequelize.define(alias, cols, config);


    return User;
}