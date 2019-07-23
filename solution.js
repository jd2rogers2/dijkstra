// given
// const points = {
//   a: {b: 6, d: 1},
//   b: {a: 6, c: 5, d: 2, e: 2},
//   c: {b: 5, e: 5},
//   d: {a: 1, b: 2, e: 1},
//   e: {d: 1, b: 2, c: 5}
// }
// find shortest path from a to e

// recursively find all paths to end
// get each path's total

// get all possible routes
// get time for each route
// get fastest route

const getAllRoutes = (points, start, end) => {
  let routes = [];
  recursion(points, [start], end, routes);
  return routes;
}

const recursion = (points, currentRoute, end, routes) => {
  if (currentRoute[currentRoute.length - 1] === end) {
    routes.push(currentRoute);
    return;
  }

  let nextNode = currentRoute[currentRoute.length - 1];
  let children = Object.keys(points[nextNode]);
  for (let x = 0; x < children.length; x++) {
    if (!currentRoute.includes(children[x])) {
      recursion(points, [...currentRoute, children[x]], end, routes);
    }
  }
}

const getSortedRouteTimes = (points, start, end) => {
  let routes = getAllRoutes(points, start, end);
  let routeTimes = [];
  for (let y = 0; y < routes.length; y++) {
    routeTimes.push([routes[y], getRoutesTime(points, routes[y])]);
  }
  return routeTimes.sort((a, b) => a[1] - b[1]);
}

const getRoutesTime = (points, route) => {
  let time = 0;

  for (let z = 0; z < route.length - 1; z++) {
    time += points[route[z]][route[z + 1]];
  }

  return time;
}

const getFastestRoute = (points, start, end) => getSortedRouteTimes(points, start, end)[0];

// naive, inefficient above. dijkstra below

// maintain dictionary with node key and shortest dist value
// from start go thru children in asc order
// maintain distance traveled var
// assign time to key of that child if lower than existing
// don't go into already processed nodes

const dijkstra = (points, start, end) => {
  let dictionary = {[start]: 0};
  dijkstraRecursion(points, start, start, dictionary);
  return dictionary[end];
}


const dijkstraRecursion = (points, current, start, dict) => {
  let nextChild = getNextChild(points, current, dict, start);
  while (nextChild) {
    dict[nextChild] = (dict[current] || 0) + points[current][nextChild];
    dijkstraRecursion(points, nextChild, start, dict);
    nextChild = getNextChild(points, current, dict, start);
  }
}

const getNextChild = (points, node, dict, start) => {
  let lowestVal = null;
  let lowestKey = null;
  for (let j in points[node]) {
    // if it's the next lowest node and ...
    // it's not in the dictionary already or would be a lower value than current value in dictionary
    if ((dict[j] === undefined || points[node][j] + dict[node] < dict[j]) && (lowestVal === null || points[node][j] < lowestVal)) {
      lowestVal = points[node][j];
      lowestKey = j;
    }
  }
  return lowestKey;
}

module.exports = {
  getAllRoutes,
  getSortedRouteTimes,
  getFastestRoute,
  dijkstra
};
