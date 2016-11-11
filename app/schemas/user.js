const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
         updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else{
        this.meta.updateAt = Date.now();
    }

    bcryptjs.genSalt(10,function(err,salt){
        if(err)
        {
            return next(err);
        }
        else
        {
            bcryptjs.hash(user.password,salt,function(err,hash){
                if(err)
                {
                    return next(err);
                }
                else
                {
                    user.password = hash;
                    next();
                }
            });
        }
    });

    // next();
});

UserSchema.method('passwordMatch',function(_password,cb){
        bcryptjs.compare(_password,this.password,function(err,isMatched){
            if(err)
            {
               return cb(err);
            }
            return cb(null,isMatched);
        })
    });


UserSchema.static('fetch',function(cb){
        return this.find({})
                    .sort('meta.updateAt')
                    .exec(cb);
    });
    
UserSchema.static('findById',function(id,cb){
        return this.findOne({_id:id})
                    .exec(cb);
    });

module.exports = UserSchema;