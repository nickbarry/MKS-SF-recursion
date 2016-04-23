// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className /* [, obj]  */){
    var obj =  arguments[1] || document.body; // If there's no arguments[1], then assume the user called the function, and start searching from the top (the body element)
    if(undefined === obj.nodeType){ // obj is an array, and has no nodeType property
        if(0 === obj.length) {return [];} // if it's an empty array, just return an empty array
        if(1 === obj.length) {return getElementsByClassName(className, obj[0]);} // If it has only one element, process that element
        return getElementsByClassName(className, obj[0]).concat(getElementsByClassName(className, obj.slice(1))); // Return results of first element concatenated with results of the rest of the array
    }else if(1 === obj.nodeType){ // obj is a node of some sort
        var classes = [].slice.call(obj.classList); // Get class list and convert to array
        var childNodesArr = [].slice.call(obj.childNodes);
        var validatedObj = -1 === classes.indexOf(className)
            ? [] // If className isn't found in classes list, return an empty array
            : [obj]; // Otherwise return an array with the object in it
        var validatedChildren = childNodesArr // childNodesArr will be undefined if obj has no children
            ? childNodesArr // return array of childNodesArr if there are any
            : []; // otherwise return an empty array
        return validatedObj.concat(getElementsByClassName(className, validatedChildren)); // concat the validated object (which may be an empty array) with the results from checking the element's children
    }else { // If nodeType is 2, 3, or 8 (attribute node, text node, or comment node), it has no children or classes...
        return []; // ...so return an empty array since the results of this function will be concatenated with other arrays
    }
};