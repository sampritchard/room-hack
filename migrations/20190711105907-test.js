'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('main', {
    id: {
      type: 'int',
      primaryKey: true
    },
    organizer_id: {
      type: 'int'
    },
    organizer_name: {
      type: 'string',
      length: 50,
    },
    room_id: {
      type: 'int',
      length: 50
    },
    room_name: {
      type: 'string',
      length: 50
    },
    meeting_start_time: {
      type: 'time'
    },
    meeting_end_time: {
      type: 'time'
    },
    meeting_name: {
      type: 'string'
    },
    iot_request_time: {
      type: 'time'
    },
    attendees: {
      type: 'string'
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
exports.down = function(db, callback) {
  db.dropTable('main', callback);
};

exports._meta = {
  "version": 1
};
