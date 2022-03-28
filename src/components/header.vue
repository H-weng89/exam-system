<template>
     <div class="header">
            <div class="logo">
                <div class="first">logo</div>
                <div class="second">废物废物废物</div>
            </div>
            <div class="right">
                <div class="message">
                    <img src="../assets/消息通知.png" alt="" style="width:25px">
                    <div class="title">消息通知</div>
                    
                </div>
                <div class="name">
                    <img src="../assets/用户.png" alt="" style="width:25px">
                    <div class="title">xxx,你好!</div>
                </div>
                <!-- <div class="icon">
    <bell-outlined :style="{fontSize:'20px'}" />
    <user-outlined :style="{fontSize:'20px'}" />
                </div> -->
            </div>
        </div>
</template>

<script>
import { defineComponent } from 'vue';
import { } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
   
  },
});
</script>


<style lang="less" scoped>
    .header{
        height: 8%;
        width: 100vw;
        background-color: white;
        display: flex;
        align-items: center;
       
        justify-content: space-between;
      
    
        
        .logo{
            height: 100%;
            width: 12.85%;
            display: flex;
            color: white;
            font-size: 20px;
            align-items: center;
            justify-content: space-around;

           
            background-color: #3a4167;
        }
        .right{
            display: flex;
            width: 30%;
            height: 100%;
            align-items: center;
            justify-content: space-around;
            .message{
             
                display: flex;
                align-items: center;
                color: #3a4176;
                font-size: 16px;
                .title{
  margin-left: 5px;
                }
              
            }
            .name{
               display: flex;
          
                font-size: 16px;
                align-items: center;
                color: #3a4176;
                .title{
                    margin-left: 5px;
                }
            }
            .icon{
                flex: 1;
                display: flex;
                justify-content: space-around;
            }
        }
    }

</style>