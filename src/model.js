/**
 * Location mongoose model
 * @file Location.js
 * @author Augustin Godiscal
 */

import mongoose from 'mongoose'
import validate from 'mongoose-validator'

const Schema = mongoose.Schema

mongoose.Promise = global.Promise // See http://mongoosejs.com/docs/promises.html

/*
 * Validations
 */

const emailValidator = validate({
  validator: 'isEmail',
  passIfEmpty: true,
  message: 'Please provide a valid email'
})

const urlValidator = validate({
  validator: 'isURL',
  passIfEmpty: true,
  message: 'Please provide a valid url'
})

const LocationSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true
  },
  slug: String,
  permalink: String,
  openingDate: Date,
  url: {
    type: String,
    validate: urlValidator
  },
  email: {
    type: String,
    validate: emailValidator
  },
  tags: {
    type: Array,
    default: ['bio']
  },
  address: {
    streetName: String,
    streetNumber: String,
    zip: {
      type: String
    },
    country: {
      type: String
    },
    countryCode: String,
    region: {
      type: String
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    location: {
      lat: Number,
      lng: Number
    }
  },
  formatted_address: {
    type: String
  },
  geometry: {
    location: {
      'type': {
        type: String,
        enum: 'Point',
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  kind: {
    type: String,
    enum: ['supermarket', 'caviste', 'grocery-store', 'market', 'webshop', 'event', 'association', 'coop'],
    required: true,
    default: 'market'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0, // 0 = unrated, 1 = très limité, 2 = moyen, 3 = pas mal, 4 = recommandé, 5 = géniale
    required: false
  },
  note: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    min: 0,
    max: 5,
    default: 3, // 0 = free, 1 = democratique, 2 = normal, 3 = normal +, 4 = cher, 5 = trop cher
    required: true
  },
  map: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: false
  },
  cover: {
    width: String,
    height: String,
    src: {
      type: String
    }
  },
  featured: {
    type: Boolean,
    'default': false
  },
  updatedAt: {
    type: Date,
    'default': Date.now
  },
  createdAt: {
    type: Date,
    'default': Date.now
  }
}, {
  strict: true
})

LocationSchema.index({ 'geometry.location': '2dsphere' })

const Location = mongoose.model('Location', LocationSchema)

Location.on('index', function (err) {
  if (err) {
    console.error('Location index error: %s', err)
  } else {
    console.info('Location indexing complete')
  }
})

export default Location
