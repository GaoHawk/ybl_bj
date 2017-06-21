<template>

</template>
<script>
import Bus from '../../common/bus.js'
export default {
    name: 'focus',
    data () {
        return{

        }
    },
    bind: function(el,binding,vnode){
        console.log(vnode)
        var input = el.querySelector('.mint-field-core');
        console.log(input);
        input.addEventListener('focus',function(){
            console.log('focus');
            Bus.$emit('clearState','');
        })

    }
}
</script>