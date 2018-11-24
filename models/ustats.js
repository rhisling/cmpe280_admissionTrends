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
    }
});

module.exports = mongoose.model('Ustats', ucstatsSchema);
