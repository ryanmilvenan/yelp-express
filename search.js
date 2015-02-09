var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

var _ = require('lodash')
var util = require('util')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        var rs = _.filter(restaurants, function(restaurant) {
            var words = _.words(restaurant.name)
            return _.includes(words, keyword)
        })  

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(restaurant) {
            var goodFor = restaurant.attributes['Good For']
            if(goodFor) {
                return goodFor[x]
            } else
                return false
        }) 

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(restaurant) {
            var ambience = restaurant.attributes.Ambience
            if(ambience){
                return ambience[x]
            } else 
                return false
        })

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(restaurant) {
            var categories = restaurant.categories
            return _.includes(categories, x)
        }) 

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        var rs = _.filter(restaurants, function(restaurant) {
            var stars = restaurant.stars
            if(stars) {
                if(relationship == 'above') {
                    return stars >= number
                } else {
                    return stars <= number
                }
            }
        })

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        
        var rs = restaurants

        if(name) {
            rs = _.filter(rs, function(restaurant) {
                var words = _.words(restaurant.name)
                return _.includes(words, name)
            })
        }

        if(minStars) {
            rs = _.filter(rs, function(restaurant) {
                var stars = restaurant.stars
                if(stars) {
                    return stars >= minStars
                }
            })
        }

        if(category) {
            rs = _.filter(rs, function(restaurant) {
                var categories = restaurant.categories
                return _.includes(categories, category)
            }) 
        }

        if(ambience) {
            rs = _.filter(rs, function(restaurant) {
                var Ambience = restaurant.attributes.Ambience
                if(Ambience){
                    return Ambience[ambience]
                } else 
                    return false
            })
        }

        if(rs.length > 0) {
            res.render('listRestaurants.jade', {
                restaurants: rs
            })
        } else {
            res.render('noResults.jade')
        }
    })    

}
