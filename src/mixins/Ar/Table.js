export default {
  data () {
    return {
      Options: [{
        value: '大吉制造',
        label: '大吉制造'
      }, {
        value: '大诚制造',
        label: '大诚制造'
      }, {
        value: '大利制造',
        label: '大利制造'
      }],
      // 宽度控制
      widthArr: {
        id: '100',
        come: '',
        company: '150',
        status: '',
        moneyType: '',
        money: '',
        money_can: '',
        money_cash: '',
        arriveDate: '120'
      }
    }
  },
  methods: {
    tableRowClassName ({
      row,
      rowIndex
    }) {
      if (row.pend) {
        return 'warning-row'
      }
      return ''
    },
    expendhandle (row, expandedRows) {
      console.log(expandedRows)
      row.pend = !row.pend
    },
    getPendedColor ({
      row,
      rowIndex
    }) {
      return 'expendcolor'
    },
    handleInfo (rowIndex, row) {
      console.log(rowIndex)
      console.log(row)
    },
    // 父table控制子table宽度控制
    widthHandle (newWidth, oldWidth, column, event) {
      this.widthArr[column.property] = newWidth
    }
  }
}
