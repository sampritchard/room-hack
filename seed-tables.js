var sql = require('mysql')
require('dotenv').config();

let emails = [
    'jamie@paddle.com',
    'ed@paddle.com',
    'dave@paddle.com',
    'sam@paddle.com',
    'robbie@paddle.com',
    'harrison@paddle.com',
    'charlie@paddle.com',
    'wahid@paddle.com',
    'rob@paddle.com',
    'adam@paddle.com',
    'joanna@paddle.com',
    'johan@paddle.com',
    'james@paddle.com',
    'eoin@paddle.com',
    'francisco@paddle.com',
    'bilquis@paddle.com',
    'sujan@paddle.com',
    'christian@paddle.com',
    'blake@paddle.com',
    'michael@paddle.com',
    'myrto@paddle.com',
    'alexia@paddle.com',
    'joel@paddle.com',
    'noah@paddle.com',
    'octave@paddle.com'
];

let room_names = [
    'Wave Stand Up Area 🌊 (10)',
    'Moneywings 💸 (10)',
    'The Island 🏝 (4)',
    'Bug Stand-up Area 🐛 (10)',
    'Stand-up Area 🐐 (10)',
    'All Hands 🙌 (100)',
    'Rocketship 🚀 (10)',
    'Unicorn 🦄 (10)'
];

let points = [
    1,
    5
];

var connection = sql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    database : process.env.RDS_DB,
    charset: "utf8mb4"
});

const SEED_BASE = 10;

connection.connect(function(err) {
    for (let i = 0; i < SEED_BASE; i++) {
        let sql = "INSERT INTO abandoned_meetings(event_id, html_link, meeting_summary, creator_email, organizer_email, room_id, room_name, meeting_start_time, meeting_end_time, iot_request_time, meeting_length, attendees) VALUES ?";
        let meetingId = generateEventId(10);
        let attendees = generateAttendeesString();
        let values = createFakeMeetingArray(meetingId, attendees);
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("meeting record inserted");
            let sqlPoints = "INSERT INTO email_points(event_id, email, points) VALUES ?";
            let pointsRows = createFakePointsArray(meetingId, attendees);
            connection.query(sqlPoints, [pointsRows], function (err, result) {
                if (err) throw err;
                console.log("points records inserted");
            });
        });
    }
});

function createFakeMeetingArray(id, attendees) {
    let theDate = new Date();
    let retArr = [
        [id, 'placeholder', 'Summary', pickRandomEmail(), pickRandomEmail(), 'roomId', pickRandomRoom(), theDate, theDate, theDate, 60, attendees]
    ];
    return retArr;
}

function createFakePointsArray(meetingId, attend) {
    let eventId = meetingId;
    let retArr = [];
    let attendees = attend.split(':');

    for (let i = 0; i < attendees.length; i++) {
        retArr.push([eventId, attendees[i], pickRandomPoints()]);
    }

    return retArr;
}

function generateEventId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function pickRandomEmail() {
    var rand = emails[Math.floor(Math.random() * emails.length)];
    return rand;
}

function pickRandomRoom() {
    var rand = room_names[Math.floor(Math.random() * room_names.length)];
    return rand;
}

function pickRandomPoints() {
    var rand = points[Math.floor(Math.random() * points.length)];
    return rand;
}

function generateAttendeesString() {
    let retStr = "";
    for (let i = 0; i < 5; i++) {
        retStr = retStr + pickRandomEmail() + ":";
    }

    retStr = retStr.slice(0, -1);
    return retStr;
}