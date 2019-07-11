'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

db.createTable('abandoned_meetings', {
  id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
  },
  event_id: {
      type: 'string'
  },
  html_link: {
      type: 'string'
  },
  meeting_summary: {
      type: 'string'
  },
  meeting_description: {
      type: 'string'
  },
  creator_email: {
      type: 'string'
  },
  organizer_email: {
      type: 'string'
  },
  room_id: {
      type: 'string'
  },
  room_name: {
    type: 'string'
  },
  meeting_start_time: {
    type: 'datetime'
  },
  meeting_end_time: {
    type: 'datetime'
  },
  iot_request_time: {
    type: 'datetime'
  },
}, function(err) {
  if (err) return callback(err);
  return callback();
});
exports.down = function(db, callback) {
  db.dropTable('main', callback);
};

exports._meta = {
  "version": 1
};
