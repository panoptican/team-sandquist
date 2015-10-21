var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST to add interviewer to event */
//query interviewer with fName and company in qs

router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        var event = {
            cohort: req.body.cohort,
            type: req.body.type
        };
        Event.addInterviewerToEvent(event, req.query, function(err, interviewer){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(interviewer);
            }
        })
    }
});

module.exports = router;