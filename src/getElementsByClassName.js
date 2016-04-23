// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// Functions/properties I can use: document.body; element.childNodes; element.classList

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className /* [,  */){
    var elsWithClass = [];
    var body = document.body;

    // PSEUDOCODE:
    // Create an internal recursive function that looks at a node or list. This function will examine a node/list.
        // If it's a node:
            // Check its class. If it has the right class, push it to the results array
            // If it has children, convert the list to an array, and then run the array of children through the function.
        // If it's an array: (just return if it's an empty array)
            // Run the function on the the first element of the array, and on the slice of the rest of the array.

    return elsWithClass;
};
