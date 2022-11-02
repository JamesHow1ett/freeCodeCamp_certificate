import React from "react";

/**
 * @param {Promise} factory
 * @param {String} name
 * @returns {Object}
 */
export function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}
