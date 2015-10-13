var shuffle = require('./shuffle');
var sort = require('./sortByNum');

var counter = 1;

var scheduler = {
    book: function(student, interviewer, match){
        student.scheduled.count.total = 1 + (student.scheduled.count.total || 0);
        student.scheduled.count[match.company] = 1 + (student.scheduled.count[match.company] || 0);
        student.scheduled.with[match.interviewerID] = true;
        interviewer.scheduled['slot' + s] = student.name;

    },
    //returns true if count of all student interviews are equal
    check: function(students, interviewTarget){
        var counts = [];
        students.forEach(function(student){
            counts.push(student.scheduled.count.total);
        });
        console.log(counts);
        for(var i = 0; i < counts.length; i++){
            if(counts[i] !== interviewTarget){
                return false;
            }
        }
        return true;
    },
    //calculates maximum possible interviews
    maxPossibleInterviews: function(interviewSlots, students, interviewers){
        var slotsUnavailable = 0;
        interviewers.forEach(function(interview){
            slotsUnavailable += Object.keys(interview.unavailable).length;
        });
        return (interviewSlots * students.length) - slotsUnavailable;
    },
    //matches interviews
    match: function(interviewSlots, interviewers, students, combinations, interviewMax, companyMax){

        var initCombinations = combinations.slice(),
            initInterviewers = interviewers.slice(),
            initStudents = students.slice();

        var currentStudents = shuffle.get(students),
            interviewers = shuffle.get(interviewers),
            sortedCombinations = sort.high(combinations),
            schedule = [],
            shifter = 0;

        //iterate through interview slots
        for(var s = 1; s <= interviewSlots; s++){
            // for each interviewer, iterate through all possible combinations
            interviewers.forEach(function(interviewer, i){
                sortedCombinations.some(function(interview, k){

                    var student = currentStudents[(i + shifter) % students.length];
                    var lastCompany;

                    //checks to see the last company that student interviewed with
                    schedule.forEach(function(interview){
                       if(interview.slot == s - 1 && interview.student == student.name){
                           lastCompany = interview.company;
                       }
                        return lastCompany;
                    });


                    //if interview ID matches the current interviewer AND interview student matches current student AND interview is available AND student has less than max interviews AND student has not interviewed with this person before AND the last interview was not with this company
                if( interview.interviewerID == interviewer.id &&
                    interview.student == student.name &&
                    interview.unavailable['slot' + s] == undefined &&
                    student.scheduled.count.total < interviewMax &&
                    student.scheduled.with[interview.interviewerID] == undefined
                    //&& interview.company !== lastCompany
                     ){
                        var match = interview;
                        match.slot = s;

                        //if student has no previous matches with this company, book interview
                        if(student.scheduled.count[interview.company] == undefined){
                            Book(student, interviewer, match);
                            sortedCombinations.splice(k, 1);
                            schedule.push(match);
                            return true;
                        }
                        //if student has no breaks AND interviewer has no breaks AND interviewer is not single
                        else if(student.scheduled.count.break == undefined && interviewer.breaks < 1 && interviewer.single == false){
                            var match = {
                                name: interviewer.name,
                                company: interviewer.company,
                                student: "Break",
                                interviewerID: interviewer.id,
                                slot: s
                            };
                            scheduleBreak(student, interviewer, s);
                            sortedCombinations.splice(k, 1);
                            schedule.push(interview);
                            return true;
                        }
                        //if student has less than companyMax with this company, book interview
                        else if(student.scheduled.count[interview.company] < companyMax){
                            Book(student, interviewer, match);
                            sortedCombinations.splice(k, 1);
                            schedule.push(match);
                            return true;
                        }
                        else {
                            var match = {
                                name: interviewer.name,
                                company: interviewer.company,
                                student: "Break - No Match",
                                interviewerID: interviewer.id,
                                slot: s
                            };
                            scheduleBreak(student, interviewer, s);
                            schedule.push(match);
                            return true;
                        }
                    }
                });
            });
            shifter++;
        }



        if(scheduler.check(students, interviewMax)){
            return {schedule: schedule, students: students, interviewer: interviewers};
        } else {
            initStudents.forEach(function(student){
                student.scheduled.with = {};
                student.scheduled.count = {total: 0};
            });
            initInterviewers.forEach(function(interviewer){
                interviewer.scheduled = {};
                interviewer.breaks = 0;
            });
            counter++;
            console.log(counter);
            return this.match(interviewSlots, initInterviewers, initStudents, initCombinations, interviewMax, companyMax);
        }


        function Book(student, interviewer, match){
            student.scheduled.count.total = 1 + (student.scheduled.count.total || 0);
            student.scheduled.count[match.company] = 1 + (student.scheduled.count[match.company] || 0);
            student.scheduled.with[match.interviewerID] = true;
            interviewer.scheduled['slot' + s] = student.name;
        }

        function scheduleBreak(student, interviewer, s){
            student.scheduled.count.break = 1 + (student.scheduled.count.break || 0);
            interviewer.scheduled['slot' + s] = "Break";
            interviewer.breaks += 1;
        }
    }
};

module.exports = scheduler;