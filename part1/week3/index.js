/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  return {
    initialDate: new Date(date),
    value: date,
    availableParams: ['years', 'months', 'days', 'hours', 'minutes'],
    add: function(count, dataParam) {
      this.validate(count, dataParam);
      if (dataParam === this.availableParams[0]) {
        this.addYears(count);
      }
      if (dataParam === this.availableParams[1]) {
        this.addMonths(count);
      }
      if (dataParam === this.availableParams[2]) {
        this.addDays(count);
      }
      if (dataParam === this.availableParams[3]) {
        this.addHours(count);
      }
      if (dataParam === this.availableParams[4]) {
        this.addMinutes(count);
      }
      return this;
    },
    subtract: function(count, dataParam) {
      this.validate(count, dataParam);
      if (dataParam === this.availableParams[0]) {
        this.addYears(-count);
      }
      if (dataParam === this.availableParams[1]) {
        this.addMonths(-count);
      }
      if (dataParam === this.availableParams[2]) {
        this.addDays(-count);
      }
      if (dataParam === this.availableParams[3]) {
        this.addHours(-count);
      }
      if (dataParam === this.availableParams[4]) {
        this.addMinutes(-count);
      }
      return this;
    },
    validate(count, dataParam) {
      if (!this.availableParams.includes(dataParam) || count < 0) {
        throw new TypeError();
      }
    },
    addYears(countOfYears) {
      this.initialDate.setFullYear(this.initialDate.getFullYear() + countOfYears);
      this.updateValue();
    },
    addMonths(countOfMonths) {
      this.initialDate.setMonth(this.initialDate.getMonth() + countOfMonths);
      this.updateValue();
    },
    addDays(countOfDays) {
      this.initialDate.setDate(this.initialDate.getDate() + countOfDays);
      this.updateValue();
    },
    addHours(countOfHours) {
      this.initialDate.setHours(this.initialDate.getHours() + countOfHours);
      this.updateValue();
    },
    addMinutes(countOfMinuts) {
      this.initialDate.setMinutes(this.initialDate.getMinutes() + countOfMinuts);
      this.updateValue();
    },
    updateValue() {
      this.value = String(this.initialDate.getFullYear())
        + '-' + (this.initialDate.getMonth() + 1 < 10 ? '0' + String(this.initialDate.getMonth() + 1) : String(this.initialDate.getMonth() + 1))
        + '-' + (this.initialDate.getDate() < 10 ? '0' + String(this.initialDate.getDate()) : String(this.initialDate.getDate()))
        + ' ' + (this.initialDate.getHours() < 10 ? '0' + String(this.initialDate.getHours()) : String(this.initialDate.getHours()))
        + ':' + (this.initialDate.getMinutes() < 10 ? '0' + String(this.initialDate.getMinutes()) : String(this.initialDate.getMinutes()))
    }
  };
};
