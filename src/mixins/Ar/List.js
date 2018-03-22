export default {
    data() {
        return {
          tableData5: [{
          pend:false,
          id: 'A205322625122',
          fid:'B10023',
          come: '富金机',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '2017-9-26',
          arriveDate: '2017-9-26',
          tableData: [],
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        },{
          id: 'A205322625123',
          fid:'B10023',
          come: '富金机',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '2017-9-26',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }, {
          id: 'A205322625124',
          fid:'B10023',
          come: '富金机',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '2017-9-26',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }, {
          id: 'A205322625125',
          fid:'B10023',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '2017-9-26',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }, {
          pend:false,
          id: 'A205322625126',
          fid:'B10023',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '2017-9-26',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }]
        }
      },
      methods: {
      tableRowClassName:function({row, rowIndex}) {
        if (row.pend) {
          return 'warning-row';
        } 
        return '';
      },
      expendhandle:function(row, expandedRows){
        console.log(expandedRows)
        row.pend=!row.pend;
      },
      getPendedColor:function({row, rowIndex}){
        return 'expendcolor';
      },
      handleInfo(rowIndex, row){
        console.log(rowIndex)
        console.log(row)
      }
    },
  }