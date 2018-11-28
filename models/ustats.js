const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ucstatsSchema = new Schema({
  INSTNM: { //'\ufeffINSTNM'
    type: String,
    default: 'Default Value'
  },
  YEAR: {
    type: String,
    default:
      '0000'
    //required: true
  },
  ADM_RATE: {
    type: String,
    default:'0'
    //required: true
  },
  SAT_AVG: {
    type: String,
    default:'0'
    //required: true
  },
  TUITIONFEE_IN: {
    type: String,
    default:'0'
    //required: true
  },
  GPA_Val: {
      type: String,
      default:'0'
      //required: true
  },
  TUITIONFEE_OUT: {
    type: String,
    default:'0'
    //required: true
  },
  RET_FT4: {
    type: String,
    default:'0'
    //required: true
  },
  PCTFLOAN: {
    type: String,
    default:'0'
    //required: true
  },
  PC_PARTTIME: {
    type: String,
    default:'0'
    //required: true
  },
  IN_EXPENDITURE: {
    type: String,
    default:'0'
    //required: true
  },
  PCTPELL: {
    type: String,
    default:'0'
    //required: true
  },
  COMPLETION_RATE: {
    type: String,
    default:'0'
    //required: true
  },
  UGDS_MEN: {
    type: String,
    default:'0'
    //required: true
  },
  UGDS_WOMEN: {
    type: String,
    default:'0'
    //required: true
  }
});

module.exports = mongoose.model('Ustats', ucstatsSchema);
