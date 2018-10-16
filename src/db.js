/**
 * Database initialization
 * @file db.js
 * @author Augustin Godiscal
 */

import mongoose from 'mongoose'

export default (dbUri) => {
  'use strict'

  const options = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
  }

  mongoose.set('debug', true)

  mongoose.connect(dbUri, options, async (err) => {
    if (err) throw err
  })

  mongoose.connection.on('connected', () => {
    console.info('Mongoose default connection open')
  })

  // If the connection throws an error
  mongoose.connection.on('error', () => {
    console.error('Mongoose default connection error')
  })

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected')
  })

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.info('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
}
