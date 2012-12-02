/**
 * @author Marenin Alex
 * December 2012
 */

define({
    load: function( name, req, load, config ){
        var fs = require.nodeRequire( 'fs' ),
            filter = /(.+)\.js/,
            files = fs.readdirSync( name ),
            modules = [],
            names = [];

        files.forEach( function( file ){
            var path = name + '/' + file;

            if ( !fs.statSync(path).isDirectory() ){
                var match = file.match( filter );
                if ( !match )
                    return;
                modules.push( name + '/' + match[1] );
                names.push( match[1] );
            }
        });

        req( modules, function(){
            var mods = Array.prototype.slice.call(arguments ),
                result;

            result = mods.reduce( function( prev, curr, i ){
                prev[names[i]] = curr;
                return prev;
            }, {});

            load( result );
        });
    }
});
