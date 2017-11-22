function travelTree(root, callback) {
    breadthFirstTravelTree(root, callback);
}

function breadthFirstTravelTree(root, callback) {
    callback(root);

    var children = root.children;
    if (children && children.length > 0) {
        children.forEach(child => breadthFirstTravelTree(child, callback));
    }
}

function deapthFirstTravelTree(root, callback) {

}

module.exports = { travelTree, breadthFirstTravelTree, deapthFirstTravelTree };