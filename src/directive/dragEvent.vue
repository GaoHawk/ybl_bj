<template>

</template>
<script>

export default {
    name: 'my-drag',
    data () {
        return{

        }
    },
    bind: function(el,binding,vnode){

      let x = 0;
      let y = 0;
      let moveX,moveY,drag;
      let prevX,prevY = 0;
      let currY=0;
      let maxHeight;
      el.addEventListener('touchstart',function(e){
          var vm = vnode.parent.child;
          drag = vnode.parent.child.dg;
          maxHeight = vm.oHeight - vm.cHeight;
          console.log(drag);
          x = e.changedTouches[0].pageX;
          y = e.changedTouches[0].pageY;
          if(el.children[1].style.transform.length >0){
            var currentTrY = el.children[1].style.transform.split(',')[1];
            currY = parseInt(currentTrY);
          }
          
      })
      el.addEventListener('touchmove',function(e){
          
          moveY = Math.round(e.changedTouches[0].pageY - y);

          if(drag){
              console.log('this event is drag');
              let panelH = (moveY+currY)>0?(moveY+currY):0;
              if(panelH> maxHeight){
                  panelH = maxHeight;
              }
              el.children[1].style.transform = "translate(0px,"+ panelH  +"px)";
          }
      })
      el.addEventListener('touchend',function(e){

          moveX = Math.round(e.changedTouches[0].pageX - x);
          moveY = Math.round(e.changedTouches[0].pageY - y);
          if(moveX ==0 && moveY ==0){
            console.log('this event is click');
          }else{
              console.log('this event is drag');
              
          }
      })
    }
}
</script>