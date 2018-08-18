var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var UserApp = require('../models/userApp');
var Account = require('../models/account');


var errorHandler = (err) => {
    if(err) {
        console.warn('Error saving app fixture');
    } else {
        console.log('Successfully saved app fixture');
    }
}
mongoose.connect('mongodb://localhost/app-builder')

var load = () => {
    console.log('Loading apps');
    return Account.findOne({email:'andyhaith@gmail.com'})
    .catch( (err) => { console.log('error finding user');} )
    .then( (account) => {
        return new UserApp({
            title: "Andy's App",
            route: "andys-app",
            icon: 'test.png',
            owner: account,
            offline: false,
            isTemplate: false,
            pages: [
                {
                    title: 'page1',
                    widgets: [ {
                        'type': 'HEADING',
                        'text': "Andy's App"
                    }
                ]
            }
        ]
        }).save();
    })
    .catch( (err) => { console.log('error creating userapp fixture - already exists?'); })
    .then( () => {
        return Account.findOne({email:'markdoub@gmail.com'});
    })
    .catch( (err) => { console.log('unable to find user'); })
    .then( (account) => {
        return  new UserApp({
            title: "Markos's App",
            route: "markos-app",
            icon: 'testmarkos.png',
            owner: account,
            offline: false,
            isTemplate: false,
            pages: [
                {
                    title: 'Home',
                    widgets: [ {
                        'type': 'HEADING',
                        'text': "Markos' App"
                    },
                    {
                        'type': 'HEADING',
                        'text': "Markos' App - another heading"
                    }
                    
                ]
            }
        ]
        }).save();
    })
    .catch( (err) => {console.error('error creating userapp fixture - already exists?'); })
    .then( () => {
        return Account.findOne({email:'andyhaith@gmail.com'});
    })
    .catch( (err) => { console.log('unable to find user'); })
    .then( (account) => {
        return  new UserApp({
            title: "Template App",
            route: "template-app",
            icon: "icon.png",
            owner: account,
            offline: false,
            isTemplate: true,
            pages: [
                {
                    "widgets": [
                        {
                            "text": "Template App",
                            "type": "title"
                        },
                        {
                            "text": "test 123",
                            "type": "text"
                        },
                        {
                            "text": "Lorem ipsum dolor sit amet, nec malis aperiam facilisi an, at est veniam nominavi delectus. Eos te elit graeci laoreet. Ut noster malorum eam, ad alterum ancillae dissentias nam. Sea doming voluptatum an.",
                            "type": "text"
                        }
                    ],
                    title: "Home"
                }
            ],
        }).save();
    })
    .catch( (err) => {console.error('error creating userapp fixture - already exists?'); })
}

module.exports = load;
