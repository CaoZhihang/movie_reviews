var Movie = require('../models/movie.js');
var _ = require('underscore');

//movie detail page
exports.detail = function(req,res){
    var id = req.params.id;

    Movie.findById(id,function(err,movie){
        if(err)
        {
            console.log(err);
        }
        res.render('detail',{title:'详情页',
                            movie:movie})
    });
}

//admin save page
exports.save = function(req,res){
    res.render('admin',{title:'添加页',
                        movie:{
                                title:'',
                                doctor:'',
                                country:'',
                                language:'',
                                poster:'',
                                flash:'',
                                year:'',
                                summary:''
                            }
                        });

}

//admin update page
exports.update = function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        res.render('admin',{title:'修改页',
                            movie:{
                                    _id:movie._id,
                                    title:movie.title,
                                    doctor:movie.doctor,
                                    country:movie.country,
                                    language:movie.language,
                                    poster:movie.poster,
                                    flash:movie.flash,
                                    year:movie.year,
                                    summary:movie.summary
                                }
                            });

    });

}

//movie save post
exports.new = function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if(id.match(/^[0-9a-fA-F]{24}$/))
    {
        Movie.findById(id,function(err,movie){
            if(err)
            {
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err)
                {
                    console.log(err);
                }

                res.redirect('/movie/'+movie._id);
            });
        });
    }
    else
    {
        _movie = new Movie({
                             title:movieObj.title,
                             doctor:movieObj.doctor,
                             country:movieObj.country,
                             language:movieObj.language,
                             poster:movieObj.poster,
                             flash:movieObj.flash,
                             year:movieObj.year,
                             summary:movieObj.summary
                            });
         _movie.save(function(err,movie){
                if(err)
                {
                    console.log(err);
                }

                res.redirect('/movie/'+movie._id);
            });
    }

}

//movie delete 
exports.delete = function(req,res){
    var id = req.query.id;

    if(id.match(/^[0-9a-fA-F]{24}$/))
    {
        console.log('2');
        Movie.remove({_id:id},function(err,movie){
            if(err)
            {
                console.log('3');
                console.log(err);
                res.json({success:-1});
            }
            else
            {
                console.log('4');
                res.json({success:1});
            }
        })
    }
    else
    {
        res.json({success:0});
    }
}

//list page
exports.list = function(req,res){
    Movie.fetch(function(err,movies){
        if(err)
        {
            console.log(err);
        }

        res.render('list',{title:'列表',
                          movies:movies});
    });
}

// //list delete movie
// app.delete('/admin/list',function(req,res){
//     var id = req.query.id;

//     if(id)
//     {
//         Movie.remove({_id:id},function(err,movie){
//             if(err)
//             {
//                 console.log(err);
//                 res.json({success:0});
//             }
//             else
//             {
//                 res.json({success:1});
//             }
//         })
//     }
// });
