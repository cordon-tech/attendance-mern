const mongoose = require('mongoose');

const pfChalanSchema = new mongoose.Schema({
    year: Number,
    month: String,
    contractorName: String,
    attendanceRecords: [{
        employeeId: String,
        fullName: String,
        fatherName: String,
        gender: String,
        dob: Date,
        doj: Date,
        designation: String,
        workingHours: { from: String, to: String },
        intervals: { from: String, to: String },
        attendance: String,
        totalDaysWorked: Number,
        weeklyOff: Number,
        absentDays: Number,
        paidHoliday: Number,
        totalWorkingDays: Number,
        totalEarnedDays: Number,
        wagePayable: Number,
        earnedWages: Number,
        hra: Number,
        overtimeEarning: Number,
        grossWages: Number,
        incomeTax: Number,
        pfDeduction: Number,
        mlwf: Number,
        totalDeduction: Number,
        netWages: Number,
        dateOfPayment: Date,
    }]
});

module.exports = mongoose.model('PFChalan', pfChalanSchema);
