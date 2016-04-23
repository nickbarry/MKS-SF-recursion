// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    var args = arguments; // Helper arguments that aren't defined above (after obj): noBracket, keys, counter
    var type = typeof obj;
    if('object' === type && true === Array.isArray(obj)){
        type = 'array'; // We'll handle arrays a bit differently from objects
    }
    if(obj === null){type = 'null'}; // typeof null is an object, but null doesn't behave like an object for the purposes of our function
    var fnFromType = {
        array: function(object){
            var bracket = args[1] ? '' : '['; // If stringifyJSON was called with the noBracket arg set to TRUE, that means we've already accounted for an opening bracket
            if(!object.length){ // If it's an empty array
                return bracket + ']';
            }else{
                var tempResult = stringifyJSON(object[0]);
                if(undefined === tempResult) tempResult = 'null'; // stringify should convert undefined and function objects to 'null' (not '"null"')
                var comma = object.length > 1
                    ? ','
                    : '';
                return bracket + tempResult + comma + stringifyJSON(object.slice(1),true);
            }
        },
        object: function(object){
            var bracket = args[1] ? '' : '{';  // If stringifyJSON was called with the noBracket arg set to TRUE, that means we've already accounted for an opening bracket
            var keys = args[2] || Object.keys(object); // If keys was passed to us, use that. This occurs when we're passing an object and have already handled some of its key/value pairs. Otherwise, start from scratch.
            if(!keys.length){ // If it's an empty object: {}
                return bracket + '}';
            }else{
                var comma = keys.length > 1
                    ? ','
                    : '';
                var tempResult = stringifyJSON(object[keys[0]]);
                if(undefined === tempResult){ // If the value for keys[0] is undefined or a function object, then we should skip this key/value pair entirely, as if it didn't exist in the original obj argument
                    return bracket + stringifyJSON(object,true,keys.slice(1));
                }else{
                    return bracket + '"' + keys[0] + '":' + tempResult + comma + stringifyJSON(object,true,keys.slice(1));
                }
            }
        },
        string: function(object){
            return '"' + object + '"';
        },
        function: function(){
            return undefined;
        },
        undefined: function(){
            return undefined;
        },
        symbol: function(){
            return undefined;
        },
        default: function(object){
            return object; // This will be coerced to string form
        }
    };
    var result = (fnFromType[type] || fnFromType.default)(obj);
    if(undefined === result){ // undefined means something was unstringifiable
        return result;
    }else{
        return '' + result; // if result wasn't undefined, return the result, coerced to string form
    }
};
