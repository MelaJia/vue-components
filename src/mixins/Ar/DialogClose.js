export default{
    methods:{
        handleClose(done){
            this.$emit('update:visibleP',false)
        }
    }
}