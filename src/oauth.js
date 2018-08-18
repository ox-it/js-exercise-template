// This file contains the various client ids, secrets etc which have been configured 
// Different servers may need different application instances registered with auth providers, and will at least require different callback urls.


var ids = {
    
    //google login
    google: {
        prod: {
            clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
            clientSecret: 'abc123',
            callbackURL: 'https://example.com/auth/google/callback'

        },
        dev: {
            clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
            clientSecret: 'abc123',
            callbackURL: 'https://example-dev.com/auth/google/callback'
        },
        local: {
            clientId: '744788623462-464hdkd9bojsrm1smc4ino5kmmol0f6v.apps.googleusercontent.com',
            clientSecret: 'KPnxHwmX43zVscb761bhu6_K',
            callbackURL: 'http://localhost:3001/auth/google/callback',
        }
    },
    
    //live login 
    windows: {
        prod: {
            applicationId: 'XXXXXXXXX',
            password: 'passpasspass',
            callbackURL: 'https://example.com/auth/microsoft/callback'
        },
        dev: {
            applicationId: 'YYYYYYYYY',
            password: 'pwpwpwpwpwpw',
            callbackURL: 'https://example.com/auth/microsoft/callback'
        },
        local: {
            applicationId: 'YYYYYYYYY',
            password: 'pwpwpwpwpwpw',
            callbackURL: 'http://localhost:3001/auth/microsoft/callback'
        }
    }
}

module.exports = ids;